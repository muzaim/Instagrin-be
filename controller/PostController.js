const PostModel = require("../model/PostModel");

const store = async (req, res) => {
  const { user_id, caption, location } = req.body;
  const photo = req.file.path;
  console.log(req.file);
  try {
    let data = await PostModel.create({ user_id, caption, location, photo });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const index = async (req, res) => {
  try {
    let data = await PostModel.find().populate("user_id");
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = { store, index };
