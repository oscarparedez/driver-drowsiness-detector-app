import { StyleSheet } from "react-native"

export const PlateRegistrationStyle = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textfield: {
            height: 30,
            width: '90%',
            paddingHorizontal: 5,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            marginVertical: 15,
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
        dropdown: {
            width: '90%',
            alignSelf: 'center'
        }
    })
}