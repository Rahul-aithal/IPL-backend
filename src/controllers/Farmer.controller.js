import { Farmer } from "../model/Farmer.Schema.js"; // Assuming the model is in farmerModel.js

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await Farmer.findById(userId);
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

// Farmer Sign Up
async function farmerSignup(req, res) {
    try {
        const { username, email, authNumber } = req.body;

        // Check if the farmer already exists
        const existingFarmer = await Farmer.findOne({
            authNumber,
        });
        if (existingFarmer) {
            return res.status(400).json({
                message: "Farmer with this username or email already exists.",
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
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
            newFarmer._id
        );

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
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
            farmer._id
        );

        // Send tokens and farmer data in response
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Farmer logged in successfully!",
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error during sign in.",
        });
    }
}

const farmerSignOut = async (req, res) => {
    if (!req.user._id)
        return res.status(400).json({ message: "Farmer not found." });
    await Farmer.findByIdAndUpdate(
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

const refreshAccessTokenFarmer = async (req, res) => {
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

        const user = await Farmer.findById(decodedToken?._id);

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
export { farmerSignup, farmerSignin, farmerSignOut, refreshAccessTokenFarmer };
