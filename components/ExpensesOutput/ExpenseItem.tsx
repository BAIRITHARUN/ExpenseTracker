import { FC } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

import { useNavigation } from '@react-navigation/native'

type ExpenseItemProps = {
    id: string,
    description: string,
    amount: number,
    date: Date,
}

const ExpenseItem: FC<ExpenseItemProps> = (props: ExpenseItemProps) => {

    const navigation = useNavigation<'ManageExpense'| any>();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: props.id
        })
    }

    return (
        <Pressable
            onPress={expensePressHandler}
            style={({pressed})=> pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textbase, styles.description]}>{props.description}</Text>
                    <Text style={styles.textbase}>{getFormattedDate(props.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{props.amount.toFixed(2)}</Text>
                </View>

            </View>
        </Pressable>
    )
}

export default ExpenseItem

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textbase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
})