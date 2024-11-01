// controllers/AuthController.js
const User = require("../models/User"); // Adjust path according to your structure
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { nom, prenom, email, numero, age, motdepasse } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const user = new User({
      nom,
      prenom,
      email,
      numero,
      age,
      motdepasse: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.motdepasse);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Return the user info in the response
    res.status(201).json({
      token,
      user: {
        name: user.nom + " " + user.prenom,
        email: user.email,
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
