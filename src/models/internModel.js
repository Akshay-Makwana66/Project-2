const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId
//intern schema
// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique:true,
      required: true
      
    },
    mobile: {
      type: Number,
      unique:true,
      required: true
    },
    collegeId:{
        type:ObjectId,
        ref:'College',
        required:true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Intern",internSchema)