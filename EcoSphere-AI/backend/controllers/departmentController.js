import Department from "../models/Department.js";

const createDepartment = async (req, res) => {
  try {
    const {
      name,
      code,
      head,
      parentDepartment,
      employeeCount,
      environmentalScore,
      socialScore,
      governanceScore,
      overallScore,
      status,
    } = req.body;

    const existingDept = await Department.findOne({ code: code.toUpperCase().trim() });
    if (existingDept) {
      return res.status(409).json({
        success: false,
        message: "Department code already exists",
      });
    }

    const department = await Department.create({
      name,
      code: code.toUpperCase().trim(),
      head: head || null,
      parentDepartment: parentDepartment || null,
      employeeCount: employeeCount || 0,
      environmentalScore: environmentalScore || 0,
      socialScore: socialScore || 0,
      governanceScore: governanceScore || 0,
      overallScore: overallScore || 0,
      status: status || "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    console.error("createDepartment() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while creating department",
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("head", "name email role")
      .populate("parentDepartment", "name code");

    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("getDepartments() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching departments",
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate("head", "name email role")
      .populate("parentDepartment", "name code");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }
    console.error("getDepartmentById() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching department",
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      head,
      parentDepartment,
      employeeCount,
      environmentalScore,
      socialScore,
      governanceScore,
      overallScore,
      status,
    } = req.body;

    const dept = await Department.findById(id);
    if (!dept) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    if (code && code.toUpperCase().trim() !== dept.code) {
      const existingDept = await Department.findOne({ code: code.toUpperCase().trim() });
      if (existingDept) {
        return res.status(409).json({
          success: false,
          message: "Department code already exists",
        });
      }
      dept.code = code.toUpperCase().trim();
    }

    if (name !== undefined) dept.name = name;
    if (head !== undefined) dept.head = head || null;
    if (parentDepartment !== undefined) dept.parentDepartment = parentDepartment || null;
    if (employeeCount !== undefined) dept.employeeCount = employeeCount;
    if (environmentalScore !== undefined) dept.environmentalScore = environmentalScore;
    if (socialScore !== undefined) dept.socialScore = socialScore;
    if (governanceScore !== undefined) dept.governanceScore = governanceScore;
    if (overallScore !== undefined) dept.overallScore = overallScore;
    if (status !== undefined) dept.status = status;

    const updatedDepartment = await dept.save();

    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }
    console.error("updateDepartment() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating department",
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }
    console.error("deleteDepartment() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting department",
    });
  }
};

export {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
