import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';

import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import businessProfile from './components/businessProfile/businessProfile';
import Home from './components/Home/Home';
import Suggestions from './components/Suggestions/Suggestions';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      businesses:[],
      events: [],
      hotEvents: [],
    }

    this.searchYelp = this.searchYelp.bind(this)
  }

  componentDidMount(){
    Yelp.events().then(events => {
      this.setState({events: events})
    }),
    Yelp.hotAndNew().then(hotEvents => {
      this.setState({ hotEvents : hotEvents})
    })
  }

  searchYelp(term, location, sortBy) {
     Yelp.search(term, location, sortBy).then(businesses => {
       this.setState({businesses: businesses});
     });
  }



  renderBusinesses =()=>{
  return (
    <div>
      <BusinessList businesses={this.state.businesses} />
    </div>
    )
  }


  render() {
    console.log(this.state.events,"hot=>", this.state.hotEvents)
    return (
    <div>
      <div className="App">
        <Link to='/'><h1 className="header">Chomp</h1></Link>
        <SearchBar searchYelp={this.searchYelp} />
    </div>
    <Switch>
      <Route exact path='/' render={(events, hotEvents) => <Suggestions events={this.state.events} hotEvents={this.state.hotEvents} />} />
      <Route path='/businesses' render={this.renderBusinesses} />
      <Route path='/businesses/:id' component={businessProfile} />
    </Switch>
    </div>
    );
  }
}


export default App;
