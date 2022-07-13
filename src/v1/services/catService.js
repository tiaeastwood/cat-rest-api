const { v4: uuid } = require("uuid");
const Cat = require("../../database/cat");

const getAllCats = () => {
  try {
    const allCats = Cat.getAllCats();
    return allCats;
  } catch (error) {
    throw error;
  }
};

const getOneCat = (catId) => {
  try {
    const cat = Cat.getOneCat(catId);
    return cat;
  } catch (error) {
    throw error;
  }
};

const createNewCat = (newCat) => {
  const catToInsert = {
    ...newCat,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdCat = Cat.createNewCat(catToInsert);
    return createdCat;
  } catch (error) {
    throw error;
  }
};

const updateOneCat = (catId, changes) => {
  try {
    const updatedCat = Cat.updateOneCat(catId, changes);
    return updatedCat;
  } catch (error) {
    throw error;
  }
};

const deleteOneCat = (catId) => {
  try {
    Cat.deleteOneCat(catId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCats,
  getOneCat,
  createNewCat,
  updateOneCat,
  deleteOneCat,
};
