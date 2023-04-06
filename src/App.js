/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's credit based on user input of new credits
  addCredit = () => {

    const newCredit = {...this.state.creditList};
    newCredit.push( {
      "id": 6,
      "description": "Tutoring",
      "amount": 200.78,
      "date": "2003-09-17T15:58:49Z"
    });

    this.setState({creditList: newCredit});
  }

  // Update state's debit based on user input of new debits
  addDebit = (debitInput) => {
  }

  // Lifecycle Method componentDidMount() which includes the API requests using given endpoints 
  async componentDidMount() {

    let linkToCreditAPI = 'https://johnnylaicode.github.io/api/credits.json';
    let linkToDebitAPI = 'https://johnnylaicode.github.io/api/debits.json';

    // Await for promise (completion) returned from API calls
    try {
      let creditResponse = await axios.get(linkToCreditAPI);
      let debitResponse = await axios.get(linkToDebitAPI);

      console.log(creditResponse); // Prints out credit Response
      console.log(debitResponse); // Prints out debit Response

      // To get data object in the response, use "response.data"
      this.setState({creditList: creditResponse.data});
      this.setState({debitList: debitResponse.data});

    }
    catch(error) { // Print out errors on console when tehre is an error response
      if (error.response){
        // The request was made, and server responded with error message and status code.
        console.log(error.creditResponse.data); // Print out error message(e.g., Not Found)
        console.log(error.creditResponse.status); // Print out error status code (e.g., 404)
      
        console.log(error.debitResponse.data); // Print out error message(e.g., Not Found)
        console.log(error.debitResponse.status); // Print out error status code (e.g., 404)
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }
  
  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} accountBalance={this.state.accountBalance} addCredit={this.addCredit} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} addDebit={this.addDebit}   />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-4-bank_of_react">
        <div>
          
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;