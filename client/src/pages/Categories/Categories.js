import React, { Component } from "react";
import API from "../../utils/API";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import { Table} from "../../components/Table";


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
			})

			.then(res => this.loadCategories())
			.catch(err => console.log(err));
		}
	};



		render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            
              <h4>Add A New Category</h4>
            
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Category(required)"
              />
              
              <FormBtn
                
                onClick={this.handleFormSubmit}
              >
                Add Category
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            
              <h4>Existing Categories</h4>
            
            {this.state.category.length ? (
              <Table>
                {this.state.category.map(category => (
                  <div key={category._id}>
                     <strong>
                        <tr>
                        <td>{category.name}</td>
                        
                        </tr>

                      </strong>
                    
                </div>
                  
                ))}
              </Table>
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















	







