const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imgSrchSchema = new Schema({
   userSearch: String,
   searchDate: Date
});

const ImgModel = mongoose.model('imgSrch', imgSrchSchema);

module.exports = ImgModel;