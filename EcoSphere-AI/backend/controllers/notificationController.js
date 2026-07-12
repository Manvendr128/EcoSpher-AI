import Notification from "../models/Notification.js";

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("getMyNotifications() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching notifications",
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID",
      });
    }
    console.error("markAsRead() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while marking notification as read",
    });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, read: false }, { read: true });
    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("markAllAsRead() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while marking all notifications as read",
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID",
      });
    }
    console.error("deleteNotification() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting notification",
    });
  }
};

export { getMyNotifications, markAsRead, markAllAsRead, deleteNotification };
