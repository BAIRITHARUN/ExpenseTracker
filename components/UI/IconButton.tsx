import { FC } from "react";
import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, View } from "react-native";

type IconButtonProps = {
    color: string | undefined,
    size: number,
    icon: 'star'| 'add' | 'trash',
    onPress: () => void
}

const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {
    return (
        <Pressable
            onPress={props.onPress}
            style = {({pressed})=> pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons
                    name={props.icon}
                    color={props.color}
                    size={props.size} />
            </View>

        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
})