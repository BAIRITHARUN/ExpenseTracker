import React, { createContext, FC, useReducer } from 'react'

export type expenseType = {
    id?: string,
    description: string,
    amount: number,
    date: Date
}
export type ExpensesContextState = {
    expenses: expenseType[] | any,
    addExpense: (expense: expenseType) => void,
    setExpenses: (expense: expenseType[]) => void,
    deleteExpense: (id: string) => void,
    updateExpense: (id: string, {}) => void
}

const expensesContextDefultValues: ExpensesContextState = {
    expenses: [],
    addExpense: (expense: expenseType) => { },
    setExpenses: (expense: expenseType[]) => { },
    deleteExpense: (id: string) => { },
    updateExpense: (id: string, {}) => { }
}

export const ExpensesContext = createContext<ExpensesContextState>(
    expensesContextDefultValues
)


function expensesReducer(state: any, action: any) {
    // console.log("Context Reducer", action)
    switch (action.type) {
        
        case 'ADD':
            //const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense: expenseType) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense: expenseType) => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesContextProvider: FC = ({ children }) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData: {}) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpenses(expense: expenseType[]) {
        // console.log("Context FC", expense)
        dispatch({type:'SET', payload: expense})
    }

    function deleteExpense(id: string) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id: string, expenseData: {}) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };


    return (
        <ExpensesContext.Provider 
         value={value}>
            {children}
        </ExpensesContext.Provider>
    );

}

export default ExpensesContextProvider;
