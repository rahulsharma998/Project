const mongoose=require("mongoose");
const referralSchema=new mongoose.Mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String, required: true },
  status: { type: String, enum: ['New', 'Evaluated', 'Hired', 'Rejected'], default: 'New' },
});
module.exports = mongoose.model('Referral', referralSchema);