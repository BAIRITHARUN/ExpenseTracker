import { FC, useLayoutEffect, useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { RootStackParamList } from '../App'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type ManageExpenseProps = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>

type expenseType = {
    id?: string
    amount: number,
    date: Date,
    description: string
}

const ManageExpense: FC<ManageExpenseProps> = (props: ManageExpenseProps) => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<any>()

    const expensesCtx = useContext(ExpensesContext)


    const editExoenseId = props.route.params?.expenseId

    console.log("Update", editExoenseId)

    const isEditing = !!editExoenseId;

    const selectedExpense = expensesCtx.expenses.filter(
        (expense: expenseType) => expense.id === editExoenseId)


    useLayoutEffect(() => {

        props.navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })

    }, [props.navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpense(editExoenseId)
            expensesCtx.deleteExpense(editExoenseId)
            props.navigation.goBack()
        } catch (error: any) {
            setError('Could not delete expense - please tryagian later')
            setIsSubmitting(false)

        }
    }

    function cancelHandler() {
        props.navigation.goBack()
    }


    async function confirmHandler(expense: expenseType) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                await updateExpense(editExoenseId, expense)
                expensesCtx.updateExpense(editExoenseId, expense)

            } else {
                const id = await storeExpense(expense)
                expensesCtx.addExpense({ ...expense, id: id })
            }
            props.navigation.goBack()
        } catch (error: any) {
            setError('Could not delete expense - please tryagian later')
            setIsSubmitting(false)
        }


    }

    function errorHandler() {
        setError(null)
    }

    if (error && !isSubmitting) {
        return (
            <ErrorOverlay
                message={error}
                onConfirm={errorHandler} />
        )
    }


    if (isSubmitting) {
        return (
            <LoadingOverlay />
        )
    }

    return (
        <View style={styles.container}>

            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultvalues={selectedExpense.length != 0 ? selectedExpense[0] : ''} />


            {isEditing && (<View style={styles.deleteContainer}>
                <IconButton
                    icon="trash"
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteExpenseHandler} />
            </View>)}

        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})