import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "CSR Approved",
        "CSR Rejected",
        "Challenge Approved",
        "Challenge Rejected",
        "Badge Unlock",
        "Reward Redeemed",
        "Compliance Reminder",
        "Policy Reminder",
      ],
      required: [true, "Type is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
