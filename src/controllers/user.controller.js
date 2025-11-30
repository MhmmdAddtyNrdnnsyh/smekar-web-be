import Users from "../models/user.model.js";
import path from "path";
import fs from "fs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.success("success to get data users", users);
  } catch (error) {
    res.error(error.message, 500);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.error("user data not found", 404);
    res.success("success to get data user", user);
  } catch (error) {
    res.error(error.message, 500);
  }
};

export const createUser = async (req, res) => {
  const { name, gender, address, email, phone_number } = req.body;
  const requiredField = { name, gender, address, email, phone_number };

  const missingField = Object.entries(requiredField)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingField.length > 0)
    return res.status(400).json({
      status: "error",
      message: `${missingField.join(", ")} required`,
    });

  try {
    let fotoUrl = null;
    let fotoName = null;

    if (req.file) {
      fotoName = req.file.filename;
      fotoUrl = `${req.protocol}://${req.get("host")}/uploads/${fotoName}`;
    }
    const user = await Users.create({
      name,
      gender,
      address,
      email,
      phone_number,
      fotoUrl,
      fotoName,
    });
    res.create("user data create success", user);
  } catch (error) {
    res.error(error.message, 500);
  }
};

export const updateUser = async (req, res) => {
  const { name, gender, address, email, phone_number } = req.body;
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.error("user data is missing", 404);

    let fotoName = user.fotoName;
    let fotoUrl = user.fotoUrl;
    if (req.file) {
      if (user.fotoName) {
        const oldPath = path.join("uploads", user.fotoName);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      fotoName = req.file.filename;
      fotoUrl = `${req.protocol}://${req.get("host")}/uploads/${fotoName}`;
    }
    await user.update({
      name,
      gender,
      address,
      email,
      phone_number,
      fotoName,
      fotoUrl,
    });
    res.update("user data update success", user);
  } catch (error) {
    res.error(error.message, 500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.error("user data is missing");
    await user.destroy();
    res.success("user data delete success", user);
  } catch (error) {
    res.error(error.message, 500);
  }
};
