import { Farmer } from "../model/Farmer.Schema.js"; // Assuming the model is in farmerModel.js

// Farmer Sign Up
async function farmerSignup(req, res) {
    try {
        const { username, email, authNumber } = req.body;

        // Check if the farmer already exists
        const existingFarmer = await Farmer.findOne({
            $or: [{ username }, { email }],
        });
        if (existingFarmer) {
            return res
                .status(400)
                .json({
                    message:
                        "Farmer with this username or email already exists.",
                });
        }

        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new farmer
        const newFarmer = new Farmer({
            username,
            email,
            authNumber,
        });

        // Save the new farmer to the database
        await newFarmer.save();

        // Generate access and refresh tokens
        const accessToken = newFarmer.generateAccessToken();
        const refreshToken = newFarmer.generateRefreshToken();

        // Send the tokens and farmer data in response
        res.status(201).json({
            message: "Farmer registered successfully!",
            farmer: {
                username: newFarmer.username,
                email: newFarmer.email,
                authNumber: newFarmer.authNumber,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error during sign up.",
        });
    }
}

// Farmer Sign In
async function farmerSignin(req, res) {
    try {
        const { username, authNumber } = req.body;

        // Find the farmer by username
        const farmer = await Farmer.findOne({ username });
        if (!farmer) {
            return res.status(400).json({ message: "Farmer not found." });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = authNumber === farmer.authNumber;
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Generate new tokens
        const accessToken = farmer.generateAccessToken();
        const refreshToken = farmer.generateRefreshToken();

        // Send tokens and farmer data in response
        res.status(200).json({
            message: "Farmer logged in successfully!",
            farmer: {
                username: farmer.username,
                email: farmer.email,
                authNumber: farmer.authNumber,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error during sign in.",
        });
    }
}

export { farmerSignup, farmerSignin };
