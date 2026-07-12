import Notification from "../models/Notification.js";

const createNotification = async (userId, title, message, type, priority = "Medium") => {
  try {
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      priority,
    });
    return notification;
  } catch (error) {
    console.error("createNotification() error:", error.message);
    throw error;
  }
};

export { createNotification };
