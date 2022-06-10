import { FC } from 'react'
import {
    StyleSheet, View, Text
} from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

type ExpensesOutputProps = {
    expenses: {
        id: string,
        description: string,
        amount: number,
        date: Date
    }[],
    periodname: string,
    fallbackText: string
}
const ExpensesOutput: FC<ExpensesOutputProps> = (props: ExpensesOutputProps) => {
    
    let content = <Text style={styles.infoText}>{props.fallbackText}</Text>
    

    if (props.expenses.length > 0 ) {
        content = <ExpensesList
        expenses={props.expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary
                periodname={props.periodname}
                expenses={props.expenses} />
            {content}
        </View>)
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})