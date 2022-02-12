const Page = require("../../../models/page");
const path = require("path");
const getReact = () => {
  return path.resolve(__dirname, "../../../../client/build");
};

// all the queries to DB MONGO_DB should be inside the services folder that we learn doday
// no all just the complex one (:
const getData = async (id) => {
  let pages = [];
  if (id) pages = await Page.findById(id);
  else pages = await Page.find({});

  return pages;
};

const addPage = async (information) => {
  const createdPage = new Page(information);
  return createdPage;
};

module.exports = {
  getData,
  addPage,
  getReact,
};
