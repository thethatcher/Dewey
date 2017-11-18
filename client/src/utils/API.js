import axios from "axios";

export default {
  
  getCategories: function() {
    return axios.get("/api/categories");
  },
 
  getCategory: function(id) {
    return axios.get("/api/categories/" + id);
  },
  
  deleteCategories: function(id) {
    return axios.delete("/api/categories/" + id);
  },
  
  saveCategories: function(categoryData) {
    return axios.post("/api/categories", categoryData);
  },
  


  getItems: function() {
    return axios.get("/api/items");
  },
 
  getItem: function(id) {
    return axios.get("/api/items/" + id);
  },
  
  deleteItems: function(id) {
    return axios.delete("/api/items/" + id);
  },
  
  saveItems: function(itemData) {
    return axios.post("/api/items", itemData);
  },

};

 

