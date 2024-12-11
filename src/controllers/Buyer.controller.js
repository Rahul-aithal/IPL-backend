import { Buyer } from "../model/Buyer.Schema.js"; // Assuming Buyer model is imported
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await Buyer.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(400).json({
            message:
                "Something went wrong while generating referesh and access token",
            error,
        });
    }
};

const options = {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "None",
};

// Buyer sign-up
export const buyerSignup = async (req, res) => {
    try {
        const { username, email, password, authNumber } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password || !authNumber) {
            return res.status(400).json({ message: "All fields are required",username, email, password, authNumber });
        }

        // Check if buyer already exists
        const existingBuyer = await Buyer.findOne({ email });
        if (existingBuyer) {
            return res
                .status(400)
                .json({ message: "Buyer already exists with this email" });
        }

        // Create new buyer with plaintext password
        const newBuyer = new Buyer({
            username,
            email,
            password, // Store plaintext password (not recommended)
            authNumber,
        });

        // Save the buyer to the database
        await newBuyer.save();

        // Generate access and refresh tokens
        const { accessToken, refreshToken } =
            await generateAccessAndRefereshTokens(newBuyer._id);

        // Respond with tokens
        res.status(201)
        .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
        .json({
            message: "Buyer registered successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Buyer sign-in
export const buyerSignin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if email and password are provided
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "username and password are required" });
        }

        // Check if buyer exists
        const buyer = await Buyer.findOne({ username });
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }

        // Compare provided password with stored plaintext password
        if (buyer.password !== password) {
            // Direct comparison (not recommended)
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken } =
            await generateAccessAndRefereshTokens(buyer._id);

        // Respond with tokens
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Buyer signed in successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

export const buyerSignOut = async (req, res) => {
    if (!req.user._id)
        return res.status(400).json({ message: "Farmer not found." });
    await Buyer.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json("User Signed Out");
};

export const refreshAccessTokenBuyer = async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json("unauthorized request");
    }
    // console.log("Incoming Refresh Token:", incomingRefreshToken);

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await Buyer.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json("Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json("Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "None",
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefereshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw Error("Invalid refresh token");
    }
};
