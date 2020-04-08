import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Balance = () => {

    const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((accumulator, amount) => (accumulator += amount), 0).toFixed(2);

    return ( 
        <React.Fragment>
            <h4>Your Balance</h4>
            <h1>${ numberWithCommas(total) }</h1>
        </React.Fragment>
     );
}