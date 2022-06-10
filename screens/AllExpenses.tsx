import { FC, useContext } from "react";
import { Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

type AllExpensesProps = {

}
const AllExpenses: FC<AllExpensesProps> = (props: AllExpensesProps) => {
    const expensesCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput
            expenses={expensesCtx.expenses}
            periodname="Total"
            fallbackText="No expenses registered found!" />
    )
}

export default AllExpenses;

const styles = StyleSheet.create({

})