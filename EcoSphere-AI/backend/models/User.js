import mongoose from "mongoose";

/**
 * User Schema
 * Represents an application user with role-based access,
 * gamification fields (xp, badges, rewards), and department assignment.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    role: {
      type: String,
      enum: ["Admin", "DepartmentHead", "Employee"],
      default: "Employee",
    },

    department: {
      type: String,
      default: "",
    },

    xp: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [String],
      default: [],
    },

    rewards: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);

export default User;
