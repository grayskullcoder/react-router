import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt} from 'react-router-dom';


const User = (params) =>{
  return(
    <h1>Welcome User {params.username}</h1>
  );
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoggedIn:false
    }
  }

  handleLogIn = ()=>{
    this.setState(prevState => ({
      isLoggedIn : !prevState.isLoggedIn
    }))
  }
  render(){
    return (
      <Router>
        <div className="App">
          <ul>
            <li><NavLink to="/" exact activeStyle={{color:'green'}}>Home</NavLink></li>
            <li><NavLink to="/about" exact activeStyle={{color:'green'}}>About</NavLink></li>
            <li><NavLink to="/user/peter" exact activeStyle={{color:'green'}}>User Peter</NavLink></li>
            <li><NavLink to="/user/john" exact activeStyle={{color:'green'}}>User John</NavLink></li>
            {/* <Link><Link to="/">Home</Link></Link> */}
          </ul>
          <Prompt 
            when = {!this.state.isLoggedIn}
            message = {(location) =>{
              return location.pathname.startsWith('/user') ? 'Are you sure?' : true
            }}
          />
          <input type="button" value={this.state.isLoggedIn ? "Log out" : "Log in"} onClick={this.handleLogIn} />
          <Route path="/" exact strict render = { 
            () => {
              return(<h1>Welcome Home</h1>);
            }
          } />
          <Route path="/about" exact strict render = { 
            () => {
              return(<h1>About Page</h1>);
            }
          } />
          <Route path="/user/:username" exact strict  render = {({match}) => (
    this.state.isLoggedIn ? (<User username = {match.params.username} />) : (<Redirect to="/" />) 
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
