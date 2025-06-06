import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }
});

const User = mongoose.model("User", userSchema);

export default User;

