import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions() {
        try {
            const response = await axios.get('https://benion-expense-tracker-mern.herokuapp.com/api/transactions-route');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: response.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`https://benion-expense-tracker-mern.herokuapp.com/api/transactions-route/${ id }`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('https://benion-expense-tracker-mern.herokuapp.com/api/transactions-route', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: response.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            loading: state.loading,
            error: state.error,
            deleteTransaction,
            addTransaction,
            getTransactions
        }}>
            { children }
        </GlobalContext.Provider>
    );
};