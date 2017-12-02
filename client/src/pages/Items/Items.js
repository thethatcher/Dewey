import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
import OutBtn from "../../components/OutBtn";
import InBtn from "../../components/InBtn";
import Checkin from "../../components/Checkin";
import Checkout from "../../components/Checkout";
import ReactDOM from "react-dom";

import classes from "./Items.css";

class Item extends Component {
  state = {
    categoryId: 1, 
    categories: [],
    item: [],
    name: "",
    description: "",
    Transaction: [],
    lent_date: "",
    due_date:"",
    returned_date:"",
    lent_condition:"",
    return_condition: "",
    displayCheckout: 0,
    displayCheckin: 0,
  };

  componentDidMount() {
    console.log("Item Component Mounted!");
    API.getCategories(sessionStorage.username)
    .then((res)=>{ 
      let tempState = {};
      tempState.categories = res.data;
      tempState.categoryId = res.data[0].id;
      API.getItems(sessionStorage.username, res.data[0].id)
      .then(itemRes => {
        (itemRes.data.length > 0) ? tempState.item = itemRes.data : console.log("itemRes is empty!");
      })
      .then(()=>{
        console.log("tempState", tempState);
        this.setState(tempState);
      });
    });
  };  

  loadCategories = () => {
    API.getCategories(sessionStorage.username)
    .then((res)=>{ 
      if(res.data){
        this.setState({ categories: res.data});
      }
    });
  };

  loadItems = () => {
    API.getItems(sessionStorage.username, this.state.categoryId)
      .then(res => {
        if(res.data){
          this.setState({ item: res.data, name: "", description: "", UserID: ""})
        }
      })
      .catch(err => console.log(err));
  };

  loadTransactions = () => {
    API.getTransaction()
      .then(res =>
        this.setState({ Transaction: res.data, lent_date: "", due_date:"", returned_date:"", lent_condition:"", return_condition: ""})
        )
        .catch(err => console.log(err));
  };

  handleSelectChange = (event)=> {
    const categoryId = parseInt(document.getElementById("categorySelect").value);
    console.log("The category ID is ",categoryId);
    this.setState({categoryId: categoryId},()=>{this.loadItems()});
  };

  handleSelectChange = (event)=> {
    const categoryId = parseInt(document.getElementById("categorySelect").value);
    console.log("The category ID is ",categoryId);
    this.setState({categoryId: categoryId},()=>{this.loadItems()});
  };

  deleteItems = id => {
    API.deleteItems(id)
      .then(res => this.loadItems())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name) {
      API.saveItems({
        name: this.state.name,
        description: this.state.description,
        UserUsername: sessionStorage.username,
        CategoryId: this.state.categoryId
      })
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
            <h1>Category</h1>
            <select id="categorySelect" onChange={this.handleSelectChange}>
              {(this.state.categories.length > 0) ? 
                (
                  this.state.categories.map((category)=>{
                    return (<option value={category.id}>{category.name}</option>);
                  })
                ) 
                : 
                (<option value="none">Please create a category to continue</option>)}
            </select>
            
            <h5>Add A New Item</h5>
            
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Item Name"
              />

               <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Item Description"
              />
              <FormBtn onClick={this.handleFormSubmit}>
                Add Item
              </FormBtn>
            </form>
            <span>        </span>

          </Col>
          <Col size="md-6">
            <h5>Existing Items</h5>
            {(this.state.item.length > 0) ? (
              <List>
              
                {this.state.item.map(item => (
                  <ListItem key={item.id}>
                    {item.name}
                    {(this.state.displayCheckin === item.id) ? (<Checkin/>) : (<span/>)}
                    {(this.state.displayCheckout === item.id) ? (<Checkout/>) : (<span/>)}                
                    {(item.lent_out) ? 
                      (<InBtn onClick={() => this.setState({displayCheckin: item.id})} title="Check-in this item" />)
                      :
                      (<OutBtn onClick={() => this.setState({displayCheckout:item.id})} title="Check-out this item" />)
                    }                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Item;