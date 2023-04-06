/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';

/* Material UI Components */
import {Container, Typography} from "@mui/material/";

class Home extends Component {
  render() {
    return <Container sx={{mt:"100px"}}>
    <Typography variant="h2">Welcome to Bank of React</Typography>
    <br/><br/>
    <img src="https://picsum.photos/200/200" alt="bank"/>
    <br/><br/>
    <AccountBalance accountBalance={this.props.accountBalance}/>

  </Container>
  }
}

export default Home;