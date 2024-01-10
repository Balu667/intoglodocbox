const DocBox = require("../schema/docbox");

const createDocBox = async (req, res) => {
  try {
    let { boxName, tags, status } = req.body, docBoxCreate
    boxName = boxName + "-" + Math.floor(10000 + Math.random() * 90000);
    docBoxCreate = await DocBox.create({
      boxName: boxName,
      $push: { tags: tags },
      status: status,
    });
    if (Object.keys(docBoxCreate).length !== 0) {
      return res.send({ status: 1, response: "DocBox successfully created!" });
    }
    return res.send({ status: 0, response: "Something went wrong" });
  } catch (error) {
    return res.send({ status: 0, response: error.message });
  }
};

const deleteDocBox = async (req, res) => {
  try {
    const { boxId } = req.body;
    let getDocBox, docBoxDelete;
    getDocBox = await DocBox.findById({ _id: boxId });
    if (getDocBox == null) {
      return res.send({ status: 0, response: "No DocBox found" });
    }
    docBoxDelete = await DocBox.deleteOne({ _id: getDocBox._id });
    if (docBoxDelete.modifiedCount !== 0 && docBoxDelete.matchedCount !== 0) {
      return res.send({ status: 1, response: "DocBox successfully deleted!" });
    }
    return res.send({ status: 0, response: "Something went wrong" });
  } catch (error) {
    return res.send({ status: 0, response: error.message });
  }
};

const getAllDocBox = async (req, res) => {
  let getAllBox;
  try {
    getAllBox = await DocBox.find();
    return res.send({ status: 1, data: JSON.stringify(getAllBox) });
  } catch (error) {
    return res.send({ status: 0, response: error.message });
  }
};

const addUserToDocBox = async (req, res) => {
  const { boxId, users } = req.body;
  let getDocBox;
  getDocBox = await DocBox.findById({ _id: boxId });
  if (getDocBox == null) {
    return res.send({ status: 0, response: "No DocBox found" });
  }
  updateUserProvision = await DocBox.findByIdAndUpdate(
    { _id: getDocBox._id },
    {
      assignUsers: users,
    }
  );
  if (updateUserProvision.modifiedCount !== 0) {
    return res.send({
      status: 1,
      response: "User Added Successfully for Docbox",
    });
  }
};

module.exports = { createDocBox, deleteDocBox, getAllDocBox, addUserToDocBox };
