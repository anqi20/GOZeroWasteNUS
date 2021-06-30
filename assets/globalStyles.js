import { StyleSheet } from 'react-native'; 
import colors from "../assets/colors";

export const globalStyles = StyleSheet.create({
    //first button 
    buttonTop: {
        height: 30,
        backgroundColor: colors.black,
        marginTop: 90,
        marginHorizontal: 30,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    }, 
    //subsequent buttons
    button: {
      height: 30,
      backgroundColor: colors.black,
      marginTop: 10, 
      marginHorizontal: 30,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    }, 
    buttonText: {
        fontSize: 14,
        color: colors.white,
        justifyContent: "center",
    },
    //first input container
    inputContainerTop: {
      marginTop: 20,
      paddingHorizontal: 30,
    },
    //subsequent input container
    inputContainer: {
      marginTop: 10, 
      paddingHorizontal: 30,
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