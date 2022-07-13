const catService = require("../services/catService");

const getAllCats = (req, res) => {
  try {
    const allCats = catService.getAllCats();
    res.send({ status: "OK", data: allCats });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneCat = (req, res) => {
  const {
    params: { catId },
  } = req;
  if (!catId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':catId' can not be empty" },
    });
  }
  try {
    const cat = catService.getOneCat(catId);
    res.send({ status: "OK", data: cat });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewCat = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.sex ||
    !body.age ||
    !body.breed ||
    !body.colour ||
    !body.likes
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }

  const newCat = {
    name: body.name,
    sex: body.sex,
    age: body.age,
    breed: body.breed,
    colour: body.colour,
    likes: body.likes,
  };
  try {
    const createdCat = catService.createNewCat(newCat);
    res.status(201).send({ status: "OK", data: createdCat });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneCat = (req, res) => {
  const {
    body,
    params: { catId },
  } = req;
  if (!catId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':catId' can not be empty" },
    });
  }
  try {
    const updatedCat = catService.updateOneCat(catId, body);
    res.send({ status: "OK", data: updatedCat });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneCat = (req, res) => {
  const {
    params: { catId },
  } = req;
  if (!catId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':catId' can not be empty" },
    });
  }
  try {
    catService.deleteOneCat(catId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllCats,
  getOneCat,
  createNewCat,
  updateOneCat,
  deleteOneCat,
};
