import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import colors from "../assets/colors";
import moment from "moment";

const statusBar = Constants.statusBarHeight;

export default function SuccessfulRedemptionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.header, { marginTop: statusBar + 20, marginBottom: 20 }]}
      >
        Redemption
      </Text>
      <View style={styles.box}>
        <Icon
          containerStyle={{ margin: 20 }}
          name="checkcircle"
          type="antdesign"
          color="#0CF574"
          size={80}
        />
        <Text style={[styles.header, { marginBottom: 20 }]}>Successful!</Text>
        <View style={styles.underlined}>
          <Text style={{ color: colors.darkGrey, fontSize: 24 }}>
            Date:{"  "}
            <Text style={{ color: colors.black, fontSize: 32 }}>
              (Tue) 24/8/2021
            </Text>
          </Text>
        </View>
        <View style={styles.underlined}>
          <Text style={{ color: colors.darkGrey, fontSize: 24 }}>
            Time:{"  "}
            <Text
              style={{
                color: colors.black,
                fontSize: 32,
              }}
            >
              {moment().utcOffset("+08:00").format("h:mm a")}
            </Text>
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20,
              marginHorizontal: 10,
            }}
            numberOfLines={3}
          >
            1 Free Coffee
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            buttonStyle={{
              backgroundColor: colors.black,
              borderRadius: 25,
              width: 250,
            }}
            containerStyle={{
              alignSelf: "center",
            }}
            title="Back"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
      <Text style={styles.subtitle}>
        If there is any error, please feedback to us or call the helpdesk{"\n"}
        @1234 5678!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 36,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: colors.darkGrey,
    textAlign: "center",
    margin: 20,
  },
  box: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.black,
    height: "70%",
    width: "90%",
    padding: 10,
  },
  underlined: {
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
