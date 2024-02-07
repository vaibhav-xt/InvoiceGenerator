import mongoose from "mongoose";

const { Schema } = mongoose;

// user schema
const UserSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    }
)

// user model
const UserModel = mongoose.model('user', UserSchema);
export default UserModel;