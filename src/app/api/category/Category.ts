import requests from "../request";

const Category = {
  getAllCategories: () => requests.baseApiGet("/categories"),
};
export default Category;
