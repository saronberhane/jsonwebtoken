const { Schema, model, mongoose } = require("mongoose");

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title"],
      maxlength: [100, "Title can not exceed 100 characters"],
      minlength: [1, "Title can not be less than 1 character"],
    },

    discription: {
      type: String,
      required: [true, "Please provide the discription"],
      maxlength: [100, "Discription can not exceed 100 characters"],
      minlength: [1, "Discription can not be less than 1 character"],
    },

    date: {
      type: Date,
      required: [true, "Please provide todays date"],
    },

    tag: {
        type: String,
        required: [true, "Please provide the tag"],
        maxlength: [50, "Tag can not exceed 100 characters"],
        minlength: [1, "Tag can not be less than 1 character"],
    },

    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);

const Journal = model("Journal", journalSchema);
module.exports = Journal;
