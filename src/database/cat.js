const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllCats = () => {
  try {
    return DB.cats;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneCat = (catId) => {
  try {
    const cat = DB.cats.find((cat) => cat.id === catId);
    if (!cat) {
      return;
    }
    return cat;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewCat = (newCat) => {
  try {
    const isAlreadyAdded =
      DB.cats.findIndex((cat) => cat.name === newCat.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `cat with the name '${newCat.name}' already exists`,
      };
    }
    DB.cats.push(newCat);
    saveToDatabase(DB);
    return newCat;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneCat = (catId, changes) => {
  try {
    const isAlreadyAdded =
      DB.cats.findIndex((cat) => cat.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `cat with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.cats.findIndex((cat) => cat.id === catId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find cat with the id '${catId}'`,
      };
    }
    const updatedCat = {
      ...DB.cats[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.cats[indexForUpdate] = updatedCat;
    saveToDatabase(DB);
    return updatedCat;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneCat = (catId) => {
  try {
    const indexForDeletion = DB.cats.findIndex((cat) => cat.id === catId);
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find cat with the id '${catId}'`,
      };
    }
    DB.cats.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllCats,
  getOneCat,
  createNewCat,
  updateOneCat,
  deleteOneCat,
};

