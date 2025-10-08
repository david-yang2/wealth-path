import {useState} from "react"
import {getTransactions} from "./transactionsApi"
const border = "border-2 border-red-300"


const Transactions = () => {
    const [transactions, setTransactions] = useState([])

      const fetchTransactions = () => {

        getTransactions()
            .then(data => {
            setTransactions(data);
            // console.log(data)
            })
            .catch(err => console.error(err));
            
        // console.log(`this is transactions: ${transactions}`)
        }


    return <div className={`${border}`}>
        <h1>here are your transactions:</h1>
        <table className={`${border} table-auto w-full`}>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Currency</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                
            {transactions.map(transaction => 
            <tr key={transaction.id}>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
            </tr>
            )}
            </tbody>
        </table>
        <button onClick={fetchTransactions}> click for transactions</button>
    </div>

}



export default Transactions