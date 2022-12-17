import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const dispatch = useDispatch();
    const { transactions, isLoading, isError } = useSelector(state => state.transaction);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    let content = null; 

    if(isLoading) {
        content = <p>Loading...</p>
    }
    if(!isLoading && isError) {
        content = <p>There is an error occured!</p>
    }
    if(!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map(transaction => 
            <Transaction key={transaction.id} transaction={transaction} />
        )
    }

    if(!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transaction found!</p>
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
