import { StyleSheet } from "react-native"

export const HomeStyle = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        button: {
            width: '90%',
            backgroundColor: 'blue',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
            marginVertical: 15,
        },
        buttontitle: {
            color: 'white',
            fontSize: 20,
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        }
    })
}