const Guide = require('../models/guideSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const guideSignup = async (req, reply) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const existingGuide = await Guide.findOne({ email });
    if (existingGuide) {
      return reply.code(400).send({ message: 'Guide already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGuide = new Guide({
      name,
      email,
      password: hashedPassword, // You’ll need to add password to the schema
      phone: phoneNumber,
    });

    await newGuide.save();

    const payload = {
      id: newGuide._id,
      email: newGuide.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return reply.code(201).send({
      message: 'Signup successful',
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return reply.code(500).send({ message: error.message || 'Server error' });
  }
};

const guideLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;
    console.log('login request received:', await Guide.findOne());
    const user = await Guide.findOne({ email });
    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return reply.code(200).send({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return reply.code(500).send({ message: 'Server error' });
  }
};

module.exports = { guideLogin, guideSignup };
