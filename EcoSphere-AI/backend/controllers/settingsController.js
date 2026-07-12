import Settings from "../models/Settings.js";

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("getSettings() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching settings",
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const {
      autoEmissionCalculation,
      evidenceRequired,
      badgeAutoAward,
      notificationSettings,
      environmentalWeight,
      socialWeight,
      governanceWeight,
    } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (autoEmissionCalculation !== undefined) settings.autoEmissionCalculation = autoEmissionCalculation;
    if (evidenceRequired !== undefined) settings.evidenceRequired = evidenceRequired;
    if (badgeAutoAward !== undefined) settings.badgeAutoAward = badgeAutoAward;

    if (notificationSettings !== undefined) {
      if (notificationSettings.email !== undefined) settings.notificationSettings.email = notificationSettings.email;
      if (notificationSettings.push !== undefined) settings.notificationSettings.push = notificationSettings.push;
      if (notificationSettings.inApp !== undefined) settings.notificationSettings.inApp = notificationSettings.inApp;
    }

    if (environmentalWeight !== undefined) settings.environmentalWeight = environmentalWeight;
    if (socialWeight !== undefined) settings.socialWeight = socialWeight;
    if (governanceWeight !== undefined) settings.governanceWeight = governanceWeight;

    const totalWeight = settings.environmentalWeight + settings.socialWeight + settings.governanceWeight;
    if (Math.abs(totalWeight - 1.0) > 0.0001) {
      return res.status(400).json({
        success: false,
        message: "The sum of environmental, social, and governance weights must equal 1.0",
      });
    }

    const updatedSettings = await settings.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("updateSettings() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating settings",
    });
  }
};

export { getSettings, updateSettings };
