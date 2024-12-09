import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  father_name: String,
  mother_name: String,
  course: String,
  registration_number: String,
  semester: String,
  college_name: String,
  roll_numberE: String,
  roll_numberC: String,
  dob: String,
  gender: String,
  category: String,
  mobile: String,
  address: String,
  img:String,
  form_id:String,
});


export const StudentMOdel = mongoose.model("Student",StudentSchema);
