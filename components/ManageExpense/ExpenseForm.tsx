import { FC, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import Button from '../UI/Button'
import { GlobalStyles } from "../../constants/styles";

type expenseType = {
    amount: number,
    date: Date,
    description: string
}

type ExpenseFormProps = {
    onCancel: () => void,
    onSubmit: (expense: expenseType) => void,
    submitButtonLabel: string,
    defaultvalues: {
        amount: string | '',
        date: string | '',
        description: string | ''
    }
}

const ExpenseForm: FC<ExpenseFormProps> = (props: ExpenseFormProps) => {

    const [inputs, setInputs] =
        useState<{
            amount: { value: string, isValid: boolean },
            date: { value: string, isValid: boolean },
            description: { value: string, isValid: boolean }
        }>(
            {
                amount: {
                    value: props.defaultvalues ? props.defaultvalues.amount.toString() : '',
                    isValid: true
                },
                date: {
                    value: props.defaultvalues ? new Date(props.defaultvalues.date).toISOString().slice(0, 10) : '',
                    isValid: true
                },
                description: {
                    value: props.defaultvalues ? props.defaultvalues.description.toString() : '',
                    isValid: true
                }
            }
        )


    function inputChangedhandler(inputIdentifier: string, enteredValue: string) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input', 'Please check your values')
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amountIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        props.onSubmit(expenseData)
        // props.onSubmit()
    }

    const formIsInvalid = !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.titleStyle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textinputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedhandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} />
                <Input
                    style={styles.rowInput}
                    label="date"
                    invalid={!inputs.date.isValid}
                    textinputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        onChangeText: inputChangedhandler.bind(this, 'date'),
                        value: inputs.date.value,
                        maxLength: 10
                    }} />

            </View>

            <Input label="description"
                invalid={!inputs.description.isValid}
                textinputConfig={{
                    multiline: true,
                    onChangeText: inputChangedhandler.bind(this, 'description'),
                    value: inputs.description.value
                }} />

            {formIsInvalid && <Text style={styles.errorText}>Invalid Data</Text>}

            <View style={styles.buttons}>
                <Button
                    mode="flat"
                    onPress={props.onCancel}
                    style={styles.button}>
                    Cancel
                </Button>

                <Button
                    mode="button"
                    onPress={submitHandler}
                    style={styles.button}>
                    {props.submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})