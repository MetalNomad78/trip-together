const mongoose = require('mongoose');
const Trip = require('../models/tripsSchema');
const User = require('../models/userSchema');
const Guide = require('../models/guideSchema');
const AssignmentTracker = require('../models/assignmentTrackerSchema');
const sendMail = require('../utils/emailServiceUtil');
const axios = require('axios');

async function createTrip(req, res) {
  const { tripData, userEmails, category } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users = await User.find({ email: { $in: userEmails } }).session(session);
    const userIds = users.map(u => u._id);

    if (userIds.length === 0) throw new Error('No users found for the given emails.');

    const guides = await Guide.find().sort({ _id: 1 }).session(session);
    if (guides.length === 0) throw new Error('No guides available.');

    let tracker = await AssignmentTracker.findOne({
      key: 'guideRoundRobin',
    }).session(session);
    if (!tracker) {
      tracker = await AssignmentTracker.create(
        [{ key: 'guideRoundRobin', lastAssignedIndex: -1 }],
        { session }
      );
      tracker = tracker[0];
    }

    const nextIndex = (tracker.lastAssignedIndex + 1) % guides.length;
    const selectedGuide = guides[nextIndex];
    console.log('Selected Guide1:', selectedGuide);
    const tripImageUrl = await getImageFromText({ query: tripData.location });
    const trip = new Trip({
      name: tripData.name,
      location: tripData.location,
      duration: tripData.duration,
      difficulty: tripData.duration,
      price: tripData.price,
      description: tripData.description,
      highlights: tripData.highlights,
      users: userIds,
      category: category,
      imageUrl: tripImageUrl,
      guide: selectedGuide._id,
    });

    tracker.lastAssignedIndex = nextIndex;
    selectedGuide.tripCount += 1;
    // console.log('Selected Guide Trip Count:', selectedGuide._id);
    await trip.save({ session });
    const response = await Guide.updateOne(
      { _id: selectedGuide._id },
      { $addToSet: { assignedTrips: trip._id } },
      { session }
    );
    await tracker.save({ session });
    await selectedGuide.save({ session });

    await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { trips: trip._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    try {
      await sendGuideAndUserEmails({
        location: tripData.location,
        guideEmail: selectedGuide.email,
        userEmails: userEmails,
      });
    } catch (error) {
      console.log('Error in sending EMAIL to guide and user', error);
    }
    console.log('✅ Trip created successfully with guide and users.');
    return res.code(200).send(trip);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('❌ Error creating trip:', err);
    return res.code(200).send(err);
  }
}

async function sendGuideAndUserEmails({ location, guideEmail, userEmails }) {
  console.log(location, guideEmail, userEmails);
  const guideHtml = generateGuideHtml({ location });
  const userHtml = generateUserHtml({ location });

  await sendMail({
    emailId: guideEmail,
    subject: 'You’ve been assigned a new trip!',
    html: guideHtml,
  });

  for (const userEmail of userEmails) {
    await sendMail({
      emailId: userEmail,
      subject: 'Your trip has been created!',
      html: userHtml,
    });
  }
}

const generateGuideHtml = ({ location }) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 10px; color: #333; max-width: 600px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://i.ibb.co/21nch0NW/tt-logo.png" alt="TripTogether Logo" style="height: 100px;" />
    </div>
    <h2 style="color: #2980b9; text-align: center; margin-top: 0;">🚨 New Trip Assigned</h2>
    <p style="font-size: 16px;">Hello Guide,</p>
    <p style="font-size: 16px;">You have been <strong>assigned a new trip</strong>.</p>
    <p style="font-size: 16px;"><strong>📍 Location:</strong> ${location}</p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 16px;">Thanks,<br/><strong>TripTogether Team</strong></p>
  </div>
`;

const generateUserHtml = ({ location }) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 10px; color: #333; max-width: 600px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://i.ibb.co/21nch0NW/tt-logo.png" alt="TripTogether Logo" style="height: 100px;" />
    </div>
    <h2 style="color: #27ae60; text-align: center; margin-top: 0;">✅ Trip Created</h2>
    <p style="font-size: 16px;">Hello Traveler,</p>
    <p style="font-size: 16px;">Your trip to <strong>${location}</strong> has been successfully created and a guide has been assigned.</p>
    <p style="font-size: 16px;">We’re thrilled to be part of your adventure!</p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 16px;">Bon voyage!<br/><strong>TripTogether Team</strong></p>
  </div>
`;

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getImageFromText(reqBody) {
  const { query } = reqBody;

  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    const imageUrl = response.data?.urls?.regular;
    return imageUrl || 'No image found';
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error.message);
    return null;
  }
}

module.exports = createTrip;
