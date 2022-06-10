import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type ExpensesSummaryProps = {
    periodname: string,
    expenses: {
        id: string,
        description: string,
        amount: number,
        date: Date
    }[]
}

const ExpensesSummary: FC<ExpensesSummaryProps> = (props: ExpensesSummaryProps) => {

    const expensesSum = props.expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)


    return (
        <View style={styles.conatiner}>
            <Text style={styles.period}>{props.periodname}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary

const styles = StyleSheet.create({
    conatiner: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})