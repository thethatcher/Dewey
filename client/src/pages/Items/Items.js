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
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';
import classes from "./Items.css";

class Item extends Component {
  state = {
    categoryId: 1, 
    categories: [],
    item: [],
    activeItem: "",
    name: "",
    borrower: "",
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
      if(res.data.length > 0){
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
      }
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
    
    {
      API.saveItems({
        name: this.state.name,
        description: this.state.description,
        UserUsername: sessionStorage.username,
        CategoryId: this.state.categoryId
      })
      .then((res)=> {this.loadItems();})
    }
  };

   handleCheckin = event => {     
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });    
    API.checkin(this.state.displayCheckin, {
      username: sessionStorage.username,
      returned_date: new Date(),
      return_condition: this.state.return_condition
      })
    .then(()=>{
      this.setState({displayCheckin: 0, return_condition: ""});
      this.loadItems();
    });
  };

  handleCheckout = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value}); 
    API.checkout(this.state.displayCheckout, {
      lent_date: new Date()
      ,due_date: new Date()
      ,lent_condition: this.state.lent_condition
      ,borrower: this.state.borrower
      ,username: sessionStorage.username
    })
    .then(()=>{
      this.setState({displayCheckout: 0, lent_condition: "", borrower: ""});
      this.loadItems();
    });
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
          </Col>
          <Col size="md-6">
            <h5>Existing Items</h5>
            {(this.state.item.length > 0) ? (
              <List>
                {this.state.item.map(item => (
                  <ListItem key={item.id}>
                    {item.name}  
                    {console.log("This is the item" ,item)}
                    {(this.state.displayCheckin === item.id) ? 
                      (
                        <div className="checkin">  
                          <div>
                            <h5>Return Date:</h5>
                            <DayPickerInput
                            formatDate={formatDate}
                            parseDate={parseDate}
                            placeholder={`${formatDate(new Date())}`}
                            />
                          </div>

                         <div className="form-group">
                            <h5>Return Condition:</h5>
                            <input 
                            className="form-control"
                            value={this.state.return_condition}
                            onChange={this.handleInputChange}
                            name="return_condition"
                            placeholder="(optional)"
                            />
                          </div>

                           <div>
                            <button  onClick={this.handleCheckin} style={{ float: "left" }} className="btn btn">Submit
                            </button>
                          </div>
                        </div>
                      ) 
                    : 
                      (<span/>)}
                    {(this.state.displayCheckout === item.id) ? 
                      (
                        <div className="checkout">        
                          <div>
                            <h5>Lent Date:</h5>
                            <DayPickerInput
                            formatDate={formatDate}
                            parseDate={parseDate}
                            placeholder={`${formatDate(new Date())}`}
                            />
                          </div>
                          <div>
                            <h5>Due Date:</h5>
                            <DayPickerInput
                            formatDate={formatDate}
                            parseDate={parseDate}
                            placeholder={`${formatDate(new Date())}`}
                            />
                          </div>
                          <div className="form-group">
                            <h5>Lent Condition:</h5>
                            <input 
                            className="form-control"
                            value={this.state.lent_condition}
                            onChange={this.handleInputChange}
                            name="lent_condition"
                            placeholder="(optional)"
                            />
                            <h5>Borrower Name:</h5>
                            <input 
                            className="form-control"
                            value={this.state.borrower}
                            onChange={this.handleInputChange}
                            name="borrower"
                            placeholder="(optional)"
                            />
                          </div>
                          <div>
                            <button  onClick={this.handleCheckout} style={{ float: "left" }} className="btn btn">Submit
                            </button>
                          </div>
                        </div>
                      ) 
                    : 
                      (<span/>)}            
                    {(item.lent_out) ? 
                      ( 
                        <div>
                          <span>Lent out to {item.Transactions[0].borrower}</span>
                          <InBtn onClick={() => this.setState({displayCheckin: item.id, activeItem: item.name})} title="Check-in this item" />
                        </div>
                      )
                      :
                      (<OutBtn onClick={() => this.setState({displayCheckout:item.id, activeItem: item.name})} title="Check-out this item" />)
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