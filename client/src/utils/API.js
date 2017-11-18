import axios from "axios";

export default {
  // Gets all books
  getCategories: function() {
    return axios.get("/api/categories");
  },
  // Gets the book with the given id
  getCategory: function(id) {
    return axios.get("/api/categories/" + id);
  },
  // Deletes the book with the given id
  deleteCategories: function(id) {
    return axios.delete("/api/categories/" + id);
  },
  // Saves a book to the database
  saveCategories: function(categoryData) {
    return axios.post("/api/categories", categoryData);
  },
  

};

 

