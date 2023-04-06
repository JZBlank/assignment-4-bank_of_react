/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

const Credits = (props) => {
  
  // Create the list of Credit items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10); 
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }

  // When user clicks Add Credit button, store user data and update current balance
  let handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCredit(this.state.creditList);  // Update state in the top-level component (App.js)
  }
  

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}
      <br/><br/>

      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input type="text" name="description" />
        <label>Amount</label>
        <input type="number" name="amount" />
        <button type="submit" >Add Credit</button>
      </form>

      <br/><br/>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br></br>
      <Link to="/">Return to Home</Link>
    </div>
  );
}
export default Credits;