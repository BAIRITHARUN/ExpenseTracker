import { FC } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

type ExpensesListProps = {
    expenses: {
        id: string,
        description: string,
        amount: number,
        date: Date
    }[]
}

const ExpensesList: FC<ExpensesListProps> = (props: ExpensesListProps) => {

    return (
        <FlatList
            data={props.expenses}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
                return (
                    <ExpenseItem 
                        amount = {itemData.item.amount}
                        date = {itemData.item.date}
                        description = {itemData.item.description}
                        id = {itemData.item.id} />
                )
            }}
            showsVerticalScrollIndicator={false} />
    )
}

export default ExpensesList

const styles = StyleSheet.create({

})