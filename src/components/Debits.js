/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

import {Container} from "@mui/material/";

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const DebitsArray =  Array.from(props.debits);
    return DebitsArray.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount.toFixed(2)} {debit.description} {date}</li>
    });
  }

  // When user clicks Add Credit button, store user data and update current balance
  let handleSubmit = (e) => {
    e.preventDefault();
    props.addDebit({
      id: props.debits.length + 1,
      description: e.target[0].value,
      amount: Number(e.target[1].value),
      date: new Date().toJSON()
    });
  }
  

  // Render the list of Debit items and a form to input new Debit item
  return (
    <Container sx={{mt:"100px"}}>
      <h1>Debits</h1>

      {debitsView()}
      <br/><br/>

      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input type="text" name="description" />
        <label>Amount</label>
        <input type="number" step="any" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br/><br/>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br></br>
      <Link to="/">Return to Home</Link>
    </Container>
  );
}

export default Debits;