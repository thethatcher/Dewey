import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";




class Item extends Component {
	state = {
		item: [],
		name: "",
    description: ""
    	};

	componentDidMount() {
		this.loadItems();
	}

	loadItems = () => {
		API.getItems(sessionStorage.username)
			.then(res =>
				this.setState({ item: res.data, name: "", description: "", UserID: ""})
				)
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
            
            {this.state.item.length ? (
              <List>
              
                {this.state.item.map(item => (
                  <ListItem key={item._id}>
                                             
                        {item.name} {item.description}
                                      
                    <EditBtn onClick={() => this.deleteItems(item._id)} />
                    
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















	







