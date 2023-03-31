import { StyleSheet } from "react-native"

export const CalibrationStyle = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
        }
    })
}