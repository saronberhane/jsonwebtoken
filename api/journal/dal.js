const JournalModel = require("./model");

class Journal {
  static async createJournal(data) {
    try {
      data.date = new Date(data.date)
      const newJournal = JournalModel.create({
        title: data.title,
        discription: data.discription,
        date: data.date,
        tag: data.tag,
        postedBy: data.postedBy,
      });
      return newJournal;
    } catch (error) {
      throw error;
    }
  }

  //get all journal entries
  static async getAllJournal() {
    try {
      const journal = await JournalModel.find();
      return journal;
    } catch (error) {
      throw error;
    }
  }

  //get by tag or date
  static async getByTagOrDate({ tag, date }) {
    try {
      const journal = await JournalModel.find({
        $or: [{ tag }, { date: new Date(date) }],
      });
      return journal;
    } catch (error) {
      throw error;
    }
  }

  //update journal entries
  static async updateJournal({ data, id }) {
    try {
      const journal = await JournalModel.findByIdAndUpdate(
        id,
        {
          title: data.title,
          discription: data.discription,
          date: data.date,
          tag: data.tag,
          postedBy: data.postedBy,
        },
        { runValidators: true, new: true }
      );
      return journal;
    } catch (error) {
      throw error;
    }
  }

  //deleting all journal entries
  static async deleteAllJournal() {
    try {
      await JournalModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  }

  //delete by title
  static async deleteJournal(title) {
    try {
      await JournalModel.findByIdAndDelete(title);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Journal;
