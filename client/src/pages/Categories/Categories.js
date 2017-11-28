import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";



class Category extends Component {
	state = {
		category: [],
		name: ""
	};

	componentDidMount() {
		this.loadCategories();
	}

	loadCategories = () => {
		API.getCategories()
			.then(res =>
				this.setState({ category: res.data, name: ""})
				)
				.catch(err => console.log(err));
	};

  deleteCategories = id => {
    API.deleteCategories(id)
      .then(res => this.loadCategories())
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
			API.saveCategories({
				name: this.state.name
        ,username: sessionStorage.username
			})

			.then(res => this.loadCategories())
			.catch(err => console.log(err));
		}
	};



		render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
            
              <h5>Add A New Category</h5>
            
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Add A New Category"
              />
              
              <FormBtn
                
                onClick={this.handleFormSubmit}
              >
                Add Category
              </FormBtn>
            </form>
            <span>        </span>

</Col>
            <Col size="md-6">
            
              <h5>Existing Categories</h5>
            
            {this.state.category.length ? (
              <List>
              
                {this.state.category.map(category => (
                  <ListItem key={category._id}>
                                             
                        {category.name}
                                      
                    <DeleteBtn onClick={() => this.deleteItems(category._id)} />
                    
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

export default Category;















	







