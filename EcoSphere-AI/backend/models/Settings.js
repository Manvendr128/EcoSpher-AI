import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    autoEmissionCalculation: {
      type: Boolean,
      default: false,
    },
    evidenceRequired: {
      type: Boolean,
      default: true,
    },
    badgeAutoAward: {
      type: Boolean,
      default: true,
    },
    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      inApp: {
        type: Boolean,
        default: true,
      },
    },
    environmentalWeight: {
      type: Number,
      default: 0.4,
      min: 0,
      max: 1,
    },
    socialWeight: {
      type: Number,
      default: 0.3,
      min: 0,
      max: 1,
    },
    governanceWeight: {
      type: Number,
      default: 0.3,
      min: 0,
      max: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
