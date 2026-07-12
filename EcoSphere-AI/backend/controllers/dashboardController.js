import User from "../models/User.js";
import CSRActivity from "../models/CSRActivity.js";
import Challenge from "../models/Challenge.js";
import Participation from "../models/Participation.js";
import ChallengeParticipation from "../models/ChallengeParticipation.js";
import DepartmentScore from "../models/DepartmentScore.js";
import { calculateOrganizationScore } from "../services/esgScoreService.js";

const getAdminDashboard = async (req, res) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const orgESG = await calculateOrganizationScore(month, year);

    const rankings = await DepartmentScore.find({ month, year })
      .populate("department", "name code")
      .sort({ totalScore: -1 });

    const recentCSR = await CSRActivity.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category", "name")
      .populate("organizer", "name");

    const recentChallenges = await Challenge.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category", "name");

    const topEmployees = await User.find({ role: "Employee" })
      .sort({ xp: -1 })
      .limit(5)
      .select("name department xp badges");

    const leaderboard = topEmployees.map((employee, index) => ({
      rank: index + 1,
      name: employee.name,
      department: employee.department,
      xp: employee.xp,
      badgeCount: employee.badges.length,
    }));

    const redeemedRewardsData = await User.find({
      role: "Employee",
      "rewards.0": { $exists: true },
    }).select("name rewards department");

    const rewardsRedeemed = redeemedRewardsData.map((user) => ({
      name: user.name,
      department: user.department,
      rewardTitle: user.rewards[user.rewards.length - 1],
    }));

    return res.status(200).json({
      success: true,
      orgESG,
      rankings,
      recentCSR,
      recentChallenges,
      leaderboard,
      rewardsRedeemed,
    });
  } catch (error) {
    console.error("getAdminDashboard() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching admin dashboard data",
    });
  }
};

const getEmployeeDashboard = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const completedCSR = await Participation.countDocuments({
      employee: employeeId,
      approvalStatus: "Approved",
    });

    const completedChallenges = await ChallengeParticipation.countDocuments({
      employee: employeeId,
      approval: "Approved",
    });

    const rank =
      (await User.countDocuments({
        role: "Employee",
        xp: { $gt: req.user.xp },
      })) + 1;

    return res.status(200).json({
      success: true,
      dashboard: {
        xp: req.user.xp,
        badges: req.user.badges,
        completedCSR,
        completedChallenges,
        rewards: req.user.rewards,
        rank,
      },
    });
  } catch (error) {
    console.error("getEmployeeDashboard() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching employee dashboard data",
    });
  }
};

export { getAdminDashboard, getEmployeeDashboard };
