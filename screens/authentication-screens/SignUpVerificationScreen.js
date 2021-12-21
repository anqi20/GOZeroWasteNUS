import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { AuthContext } from "../../assets/AuthContext";
import firebase from "../../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignUpVerificationScreen({ navigation }) {
  const [showError, setError] = useState("");

  function validateEmail() {
    const currUser = firebase.auth().currentUser;
    if (currUser !== null) {
      console.log("User id: " + firebase.auth().currentUser.uid);
      currUser
        .reload()
        .then(() => {
          console.log(`Is user verified: ${currUser.emailVerified}`);
          if (currUser.emailVerified) {
            setError("");
            navigation.navigate("Sign Up Success");
          } else {
            setError(
              "Please ensure you have validated your email. Remember to check your junk mail!"
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("No user found");
      setError("Ensure you have not signed up with this account before!");
    }
  }

  function resendEmail() {
    const currUser = firebase.auth().currentUser;
    if (currUser !== null) {
      currUser
        .sendEmailVerification()
        .then(() => {
          console.log("Email verification resent!");
        })
        .catch((error) => {
          setError(
            "Please check your email again or try resending again after 10 minutes."
          );
        });
    } else {
      console.log("No user");
      setError("Ensure you have not signed up with this account before!");
    }
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="email"
        size={60}
        color="black"
        style={{ alignSelf: "center", marginBottom: 10 }}
      />
      <Text style={styles.text}>
        A validation email from noreply@renuse-83e58.firebaseapp.com has been sent!{"\n"}{"\n"}
        Please check your email and
        validate your account to continue.
      </Text>
      {showError == "" ? null : (
        <Text style={styles.errorText}>{showError}</Text>
      )}
      {showError ==
      "Ensure you have not signed up with this account before!" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Log In Screen")}
          style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Back to log in</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={validateEmail} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resendEmail}>
        <Text style={styles.resendText}>Resend validation email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 50,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    margin: 20,
    color: colors.red,
  },
  resendText: {
    textAlign: "center",
    fontSize: 14,
    margin: 20,
    color: colors.darkGrey,
    textDecorationLine: "underline",
  },
});

//   const validationSchema = yup.object().shape({
//     code: yup
//       .string()
//       .label("code")
//       .length(6, "Please enter a valid verification code")
//       .required("Please enter your verification code"),
//   });

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <Formik
//             initialValues={{ code: "" }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//               navigation.navigate("Sign Up Success");
//             }}
//           >
//             {({ handleChange, handleSubmit, errors, isValid }) => (
//               <View>
//                 <Text style={styles.text}>
//                   Enter the verification code sent to your email.
//                 </Text>
//                 <Input
//                   containerStyle={globalStyles.inputContainerTop}
//                   label="Your verification code"
//                   labelStyle={globalStyles.inputLabel}
//                   placeholder="Verification code"
//                   inputStyle={globalStyles.inputInput}
//                   leftIcon={<Ionicons name="shield-checkmark" size={24} />}
//                   onChangeText={handleChange("code")}
//                   secureTextEntry={true}
//                 />

//                 <Text style={globalStyles.inputError}>{errors.code}</Text>

//                 <TouchableOpacity
//                   style={globalStyles.buttonTop}
//                   onPress={handleSubmit}
//                   disabled={!isValid}
//                 >
//                   <Text style={globalStyles.buttonText}>Submit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={globalStyles.button}>
//                   <Text style={globalStyles.buttonText}>
//                     Resend verification code
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </Formik>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 20,
//   },
//   text: {
//     paddingHorizontal: 30,
//     textAlign: "center",
//     fontSize: 14,
//     color: colors.darkGrey,
//   },
// });
