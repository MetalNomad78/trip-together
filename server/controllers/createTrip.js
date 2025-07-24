const mongoose = require("mongoose");
const Trip = require("../models/tripsSchema");
const User = require("../models/userSchema");
const Guide = require("../models/guideSchema");
const AssignmentTracker = require("../models/assignmentTrackerSchema");
const fs = require("fs");
const path = require("path");
const logoPath = path.join(__dirname, "../assets/tt_logo.png");
const logoData = fs.readFileSync(logoPath).toString("base64");
const base64Logo = `data:image/png;base64,${logoData}`;

async function createTrip(req, res) {
  const { tripData, userEmails,category} = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users = await User.find({ email: { $in: userEmails } }).session(
      session,
    );
    const userIds = users.map((u) => u._id);

    if (userIds.length === 0)
      throw new Error("No users found for the given emails.");

    const guides = await Guide.find().sort({ _id: 1 }).session(session);
    if (guides.length === 0) throw new Error("No guides available.");

    let tracker = await AssignmentTracker.findOne({
      key: "guideRoundRobin",
    }).session(session);
    if (!tracker) {
      tracker = await AssignmentTracker.create(
        [{ key: "guideRoundRobin", lastAssignedIndex: -1 }],
        { session },
      );
      tracker = tracker[0];
    }

    const nextIndex = (tracker.lastAssignedIndex + 1) % guides.length;
    const selectedGuide = guides[nextIndex];

    tracker.lastAssignedIndex = nextIndex;
    selectedGuide.tripCount += 1;
    await Guide.updateOne(
      { _id: selectedGuide._id },
      { $addToSet: { trips: trip._id } },
      { session },
    );
    await tracker.save({ session });
    await selectedGuide.save({ session });

    const trip = new Trip({
      ...tripData,
      users: userIds,
      category:category,
      guide: selectedGuide._id,
    });

    await trip.save({ session });

    await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { trips: trip._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
    try {
      await sendGuideAndUserEmails();
    } catch (error) {
      console.log("Error in sending EMAIL to guide and user", error);
    }
    console.log("✅ Trip created successfully with guide and users.");
    return res.code(200).send(trip);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("❌ Error creating trip:", err);
    return res.code(200).send(err);
  }
}

async function sendGuideAndUserEmails({ state, city, guideEmail, userEmails }) {
  const guideHtml = generateGuideHtml({ state, city });
  const userHtml = generateUserHtml({ state, city });

  await sendMail({
    emailId: guideEmail,
    subject: "You’ve been assigned a new trip!",
    html: guideHtml,
  });

  for (const userEmail of userEmails) {
    await sendMail({
      emailId: userEmail,
      subject: "Your trip has been created!",
      html: userHtml,
    });
  }
}

const generateGuideHtml = ({ state, city }) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${base64Logo}" alt="TripTogether Logo" style="height: 60px;" />
    </div>
    <h2>📍 New Trip Assignment</h2>
    <p>Hello Guide,</p>
    <p>You have been <strong>assigned a new trip</strong>.</p>
    <p><strong>Location:</strong> ${city}, ${state}</p>
    <br/>
    <p>Thanks,<br/>TripTogether Team</p>
  </div>
`;

const generateUserHtml = ({ state, city }) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${base64Logo}" alt="TripTogether Logo" style="height: 60px;" />
    </div>
    <h2>🎒 Trip Created Successfully</h2>
    <p>Hello Traveler,</p>
    <p>Your trip to <strong>${city}, ${state}</strong> has been successfully created and assigned a guide.</p>
    <p>We’re excited to see you explore new places with us!</p>
    <br/>
    <p>Bon voyage!<br/>TripTogether Team</p>
  </div>
`;

module.exports = createTrip;
