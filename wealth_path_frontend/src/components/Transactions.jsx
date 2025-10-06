import {useState} from "react"
import {getTransactions} from "./transactionsApi"



const Transactions = () => {
    const [transactions, setTransactions] = useState([])

      const fetchTransactions = () => {

            getTransactions()
                .then(data => {
                setTransactions(data);
                })
                .catch(err => console.error(err));
        }


    return <div>
        <h1>here are your transactions:</h1>
        <ul>
            {transactions.map(transaction => 
            <li key={transaction.id}>
                {transaction.type}
            </li>)}
        </ul>
        <button onClick={fetchTransactions}> click for transactions</button>
    </div>

}



export default Transactions