const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId
//intern schema
const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique:true,
      required: true,
      trim: true
    },
    mobile: {
      type: Number,
      unique:true,
      required: true,
      trim: true
    },
    collegeId:{
        type:ObjectId,
        ref:'College',
        required:true,
        trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Intern",internSchema)