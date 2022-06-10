import { FC, useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/https";
type RecentExpensesProps = {

}

type expenseType = {
    id?: string
    amount: number,
    date: Date,
    description: string
}

const RecentExpenses: FC<RecentExpensesProps> = (props: RecentExpensesProps) => {
    const expensesCtx = useContext(ExpensesContext);

    const [isFetching, setIsFtching] = useState<boolean>(true)
    const [error, setError] = useState<any>()
    const [fetchedExpenses, setFecthedExpenses] = useState<{
        id: string
        amount: number,
        date: Date,
        description: string
    }[]>([])

    useEffect(() => {
        async function fetchExpenses() {
            setIsFtching(true)
            try {
                const response = await getExpenses();
                expensesCtx.setExpenses(response)
            } catch (error: any) {
                setError('Could not fetch expenses!')
            }

            setIsFtching(false)
        }
        fetchExpenses()
    }, [])

    function errorHandler() {
        setError(null)
    }

    if (error && !isFetching) {
        return (
            <ErrorOverlay
                message={error}
                onConfirm={errorHandler} />
        )
    }

    if (isFetching) {
        return (
            <LoadingOverlay />
        )
    }


    const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
        const today = new Date();
        // console.log(today)
        const date7DaysAgo = getDateMinusDays(today, 7)
        // console.log(expense)
        return expense.date > date7DaysAgo;
    })

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            periodname="Last 7 days"
            fallbackText="No expenses registered for the last 7 days" />
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({

})