import { cstudentModel } from "../models/cstudent.js";
import { userModel } from "../models/user.js";

// 1. פונקציה להחזרת כל ההשאלות
export const getAllCstudent = async (req, res) => {
  try {
    let result = await cstudentModel.find();
    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot get all cstudents", message: err.message });
  }
};

// 2. פונקציה להחזרת השאלה לפי מזהה (ID)
export const getCstudentById = async (req, res) => {
  try {
    const result = await cstudentModel.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ title: "cannot find by id", message: "ID not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot get by id", message: err.message });
  }
};

// 3. פונקציה להחזרת כל ההשאלות לפי מזהה משתמש
export const getCstudentByUserId = async (req, res) => {
  try {
    const result = await cstudentModel.find({ userId: req.params.userId });
    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot get all by user id", message: err.message });
  }
};

// 4. פונקציה להחזרת השאלה
export const returnCstudent = async (req, res) => {
  try {
    const result = await cstudentModel.findByIdAndUpdate(req.params.id, {
      $set: { returnDate: new Date() },
    }, { new: true });

    if (!result) {
      return res.status(404).json({ title: "cannot update by id", message: "ID not found or invalid" });
    }

    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot update", message: err.message });
  }
};

// 5. פונקציה לעדכון נתונים נוספים לפי מזהה
export const updateCstudentById = async (req, res) => {
  try {
    const result = await cstudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ title: "cannot update by id", message: "ID not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot update by id", message: err.message });
  }
};

export const addCstudent = async (req, res) => {
    let {body}=req;
    if(!body.userId||!body.books||!body.books.length)
        return res.status(404).json({title:"connot add cstudent",message:"missing details:userId/courses"})
    try {
      let user = await userModel.findById(body.userId);
      if (!user) {
        return res.status(404).json({ title: "no such user", message: "" });
      }
      if(user.fine>0)
        return res.status(403).json({ title: "this user need to pay fine", message: "cannot take cstudent" })
    let newCstudent=new cstudentModel(body);
    await newCstudent.save();
      res.json(newCstudent);
    } catch (err) {
      res.status(400).json({ title: "cannot update by id", message: err.message });
    }
  };