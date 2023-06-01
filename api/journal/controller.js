const Journal = require("./dal");

exports.createJournal = async (req, res) => {
  try {
    const { title, discription, date, tag, postedBy } = req.body;

    if (!title || !discription || !date || !tag || !postedBy) {
      return res.status(400).json({
        status: "ERROR",
        message: "Please provide the required informations",
      });
    }

    //creating a new journal entry
    const newJournal = await Journal.createJournal({
      title,
      discription,
      date,
      tag,
      postedBy,
    });
    //return the new journal entry
    res.status(200).json({
      status: "SUCCESS",
      message: "The new journal entry was added successfully",
      data: {
        book: newJournal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

//get journal by tage and date
exports.getByTagOrDate = async (req, res) => {
  try {
    const journal = await Journal.getByTagOrDate({
      tag: req.query.tag,
      date: req.query.date,
    });
    if (journal.length === 0) {
      return res.status(404).json({
        status: "FAIL",
        message: "There is no information with this tag or date",
      });
    }

    res.status(200).json({
      status: "SUCCESS",
      data: {
        journal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

//get all journal entries
exports.getAllJournal = async (req, res) => {
  try {
    const journal = await Journal.getAllJournal();

    res.status(200).json({
      status: "SUCCESS",
      data: {
        journal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

//update journal entries
exports.updateJournal = async (req, res) => {
  try {
    const journalID = await Journal.getByid(req.params.id);
    if (!journalID) {
      return res.status(404).json({
        status: "FAIL",
        message: "There is no journal with this ID",
      });
    }

    const { title, discription, date, tag, postedBy } = req.body;

    const journal = await Journal.updateJournal({
      data: {
        title,
        discription,
        date,
        tag,
        postedBy,
      },
      id: req.params.id,
    });

    res.status(200).json({
      status: "SUCCESS",
      message: "Journal entrie has been successfully updated",
      data: {
        journal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

//delete journal entries
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.getByTagOrDate({
      tag: req.params.tag,
      date: req.params.date,
    });

    if (journal.length === 0) {
      return res.status(404).json({
        status: "FAIL",
        message: " There is no journal entrie with this tag or date",
      });
    }

    await Journal.deleteJournal(req.params.title);

    res.status(200).json({
      status: "ERROR",
      message: error.message,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

//delet all journal entries
exports.deleteAllJournal = async (req, res) => {
  try {
    const journal = await Journal.deleteAllJournal();
    res.status(200).json({
      status: "SUCCESS",
      message: "The journal entries were all deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};
