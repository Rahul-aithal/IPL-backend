import{ Buyer } from "../model/BuyerSchema.js";  // Assuming Buyer model is imported

// Buyer sign-up
export const buyerSignup = async (req, res) => {
  try {
    const { username, email, password, authNumber } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !authNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if buyer already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: "Buyer already exists with this email" });
    }

    // Create new buyer with plaintext password
    const newBuyer = new Buyer({
      username,
      email,
      password,  // Store plaintext password (not recommended)
      authNumber,
    });

    // Save the buyer to the database
    await newBuyer.save();

    // Generate access and refresh tokens
    const accessToken = newBuyer.generateAccessToken();
    const refreshToken = newBuyer.generateRefreshToken();

    // Respond with tokens
    res.status(201).json({
      message: "Buyer registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Buyer sign-in
export const buyerSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if buyer exists
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    // Compare provided password with stored plaintext password
    if (buyer.password !== password) {  // Direct comparison (not recommended)
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = buyer.generateAccessToken();
    const refreshToken = buyer.generateRefreshToken();

    // Respond with tokens
    res.status(200).json({
      message: "Buyer signed in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
