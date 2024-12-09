import { StudentMOdel } from "../Schema/students.model.js";
import uploadOnCloudinary from "../utilis/cloudinary.js";

const add_Data = async (req, res) => {
    console.log("data console log ok");
    
  const {
    images,
    name,
    father_name,
    mother_name,
    course,
    registration_number,
    semester,
    college_name,
    roll_numberE,
    roll_numberC,
    dob,
    gender,
    category,
    mobile,
    address,
    form_id,
  } = req.body;

  console.log( {name:name,
    fat:father_name,
    mot:mother_name,
    course:course,
    regisNo:registration_number,
    semes:semester,
    collegename:college_name,
   ErllN: roll_numberE,
   crollNo: roll_numberC,
   dob: dob,
    gender:gender,
    catego:category,
    mobile:mobile,
    address:address,
    formId:form_id,});


  

  if (
    [
      name,
      father_name,
      mother_name,
      course,
      registration_number,
      semester,
      college_name,
      roll_numberE,
      roll_numberC,
      dob,
      gender,
      category,
      mobile,
      address,
      form_id,
    ].some((i) => i == null)
  ) {
    return res.status(400).json({ message: "All fileds are required" });
  }


  const thumbnail = req.files?.img[0]?.path
  const uploadImg = await uploadOnCloudinary(thumbnail);
  

  const studnet = await StudentMOdel.create({
    img:images[0],
    name,
    father_name,
    mother_name,
    course,
    registration_number,
    semester,
    college_name,
    roll_numberE,
    roll_numberC,
    dob,
    gender,
    category,
    mobile,
    address,
    form_id,
  });

  const studentDetails = await StudentMOdel.findById(studnet._id);
  if(!studentDetails){
    return res.status(400).json({message:"Not add data in database"});
  }

  console.log(studentDetails)

  return res.status(200).json({message:"Data added successfully",studentDetails})

};


const filterData = async (req, res) => {
  try {
    const { name, college_name, year, semester, course } = req.body; // Add course to the request body

    // Building filter criteria dynamically
    let filterCriteria = [];

    if (name) {
      filterCriteria.push({ name: { $regex: name, $options: "i" } });
    }
    if (college_name) {
      filterCriteria.push({ college_name: { $regex: college_name, $options: "i" } });
    }
    if (year) {
      filterCriteria.push({ year: year });
    }
    if (semester) {
      filterCriteria.push({ semester: semester });
    }
    if (course) {
      filterCriteria.push({ course: { $regex: course, $options: "i" } }); // Add course to the criteria
    }

    // Fetching data based on AND condition
    const filterDataValue =
      filterCriteria.length > 0
        ? await StudentMOdel.find({ $and: filterCriteria }) // Apply $and
        : await StudentMOdel.find(); // No filters, return all data

    // Sending response
    if (filterDataValue.length > 0) {
      res.status(200).json({
        success: true,
        message: "Data filtered successfully",
        data: filterDataValue,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No matching data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error filtering data",
      error: error.message,
    });
  }
};






export { add_Data,filterData };
