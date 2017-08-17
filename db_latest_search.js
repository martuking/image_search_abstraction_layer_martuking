var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var latest_search_Schema = new Schema(
  {
    searchterm: String,
    offset: Number,
    when: { type: Date, default: Date.now }
  },
  { timestap: true }
);
var ModelClass = mongoose.model(
  "latest_search_structure",
  latest_search_Schema
);
module.exports = ModelClass;
