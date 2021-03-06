import axios from "axios";

export default {
  
  getCategories: function(username) {
    return axios.get("/api/users/categories/" + username);
  },
 
  getCategory: function(id) {
    return axios.get("/api/categories/" + id);
  },
  
  deleteCategories: function(id, username) {
    return axios.delete("/api/categories/" + id + "/" + username);
  },
  
  saveCategories: function(categoryData) {
    console.log(categoryData.username);
    return axios.post("/api/categories", categoryData);
  },
  


  getItems: function(username, categoryId) {
    return axios.get("/api/users/items/" + username + "/" + categoryId);
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

  getTransaction: function() {
    return axios.get("/api/transactions");
  },

  saveTransactions: function(transactionData) {
    return axios.post("/api/transactions", transactionData);
  },

  checkUser: function(email) {
    return axios.post("/api/users", email);
  },

  checkout: function(id, transactionData){
    return axios.post("/api/items/checkout/" + id, transactionData)
  },

  checkin: function(id, transactionData){
    return axios.put("/api/items/checkin/" + id, transactionData)
  },

};

 

