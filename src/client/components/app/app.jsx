import React, { Component } from 'react';
import {
  Grid, Navbar, Nav, NavItem, FormGroup, FormControl
} from 'react-bootstrap';
import './app.css';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'>WeatherShower</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem href='/'>
                Home
              </NavItem>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type='text' placeholder='Search'/>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
           { children }
        </Grid>
      </div>
    );
  }
}
