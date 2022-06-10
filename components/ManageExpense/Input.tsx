import { FC, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type InputProps = {
    label: string,
    textinputConfig: {},
    style?: {},
    invalid: boolean
}

const Input: FC<InputProps> = (props: InputProps) => {

    let inputStyles = [] 
    inputStyles.push(styles.input)

    if(props.textinputConfig && Object.keys(props.textinputConfig).includes('multiline')){
        inputStyles.push(styles.inputMultiline)
    }

    if(props.invalid){
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View style={[styles.inputContainer, props.style]}>
            <Text style={[styles.label, props.invalid && styles.invalidLable]}>
                {props.label}
            </Text>
            <TextInput style={inputStyles} {...props.textinputConfig}/>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})