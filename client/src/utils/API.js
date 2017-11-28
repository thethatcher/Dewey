import axios from "axios";

export default {
  
  getCategories: function(username) {
    return axios.get("/api/users/categories/" + username);
  },
 
  getCategory: function(id) {
    return axios.get("/api/categories/" + id);
  },
  
  deleteCategories: function(id, username) {
    return axios.delete("/api/categories/" + id, {username: username});
  },
  
  saveCategories: function(categoryData) {
    console.log(categoryData.username);
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

 

