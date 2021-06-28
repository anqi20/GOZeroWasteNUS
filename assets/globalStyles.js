import { StyleSheet } from 'react-native'; 
import colors from "../assets/colors";

export const globalStyles = StyleSheet.create({
    button: {
        height: 30,
        backgroundColor: colors.black,
        marginHorizontal: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    }, 
    buttonText: {
        fontSize: 14,
        color: colors.white,
        justifyContent: "center",
    },
    inputContainer: {
        marginTop: 20,
        paddingHorizontal: 25,
      },
      inputLabel: {
        color: colors.black,
        marginBottom: -5,
      },
      inputInput: {
        fontSize: 14,
      },
      inputError: {
        alignSelf: "center",
        color: colors.red,
      },
});