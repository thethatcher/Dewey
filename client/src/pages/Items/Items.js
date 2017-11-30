import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
let categorySelect = [];
let itemArray = [];

class Item extends Component {
	state = {
    categoryId: 1, 
    categories: categorySelect,
		item: itemArray,
		name: "",
    description: ""
    	};

	componentDidMount() {
		this.loadItems();
    this.loadCategories();
	}

  loadCategories = () => {
    API.getCategories(sessionStorage.username)
    .then((res)=>{ 
      if(res.data){
        categorySelect = res;
        this.setState({ categories: categorySelect.data});
      }
    });
  };

	loadItems = () => {
		API.getItems(sessionStorage.username)
			.then(res => {
        if(res.data){
				  this.setState({ item: res.data, name: "", description: "", UserID: "", categories: categorySelect})
				}
        this.loadCategories();
        })
				.catch(err => console.log(err));
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
        UserUsername: sessionStorage.username
			})

			.then(res => this.loadItems())
			.catch(err => console.log(err));
		}
	};



		render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
            <h1>Category</h1>
            <select>
              {(this.state.categories.length > 0) ? 
                (
                  this.state.categories.map((category)=>{
                    //TODO add an onselect to change the this.state.categoryId
                    return (<option value={category.name}>{category.name}</option>);
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
                         
              
              <FormBtn
                
                onClick={this.handleFormSubmit}
              >
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
                                             
                        {item.name} {item.description}
                                      
                    <EditBtn onClick={() => this.deleteItems(item.id)} />
                    
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















	







