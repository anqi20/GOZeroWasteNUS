import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";
import moment from "moment";
import { globalStyles } from "../assets/globalStyles";
import {
  useNavigation,
  StackActions,
  CommonActions,
} from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";

export default function SuccessBox({
  numCups,
  numContainers,
  text,
  location,
  numCoins,
  header,
  isReturn,
}) {
  const navigation = useNavigation();

  function renderContent() {
    //Successful returns / BYO
    if (numCoins > 0) {
      if (numCups > 0 && numContainers > 0) {
        return (
          <View>
            <Text>Reusables:</Text>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numContainers}</Text>
              <Image source={require("../assets/AppImages/container.png")} />
            </View>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numCups}</Text>

              <Image source={require("../assets/AppImages/cup.png")} />
            </View>
            <Text>You have earned:</Text>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numCoins}</Text>

              <Image source={require("../assets/AppImages/coin.png")} />
            </View>
          </View>
        );
      } else if (numCups > 0) {
        return (
          <View>
            <Text>Reusables:</Text>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numCups}</Text>

              <Image source={require("../assets/AppImages/cup.png")} />
            </View>
            <Text>You have earned:</Text>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numCoins}</Text>

              <Image source={require("../assets/AppImages/coin.png")} />
            </View>
          </View>
        );
      } else if (numContainers > 0) {
        return (
          <View>
            <Text>Reusables:</Text>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numContainers}</Text>
              <Image source={require("../assets/AppImages/container.png")} />
            </View>
            <Text>You have earned:</Text>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numCoins}</Text>

              <Image source={require("../assets/AppImages/coin.png")} />
            </View>
          </View>
        );
      } else {
        return null;
      }
    }
    //Borrow Screens
    else {
      if (numCups > 0 && numContainers > 0) {
        return (
          <View>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numContainers}</Text>
              <Icon name="cube" type="font-awesome" size={48} color="black" />
            </View>
            <View style={styles.variableContent}>
              <Text style={styles.number}>{numCups}</Text>

              <Image source={require("../assets/AppImages/cup.png")} />
            </View>
          </View>
        );
      } else if (numCups > 0) {
        return (
          <View style={styles.variableContent}>
            <Text style={styles.number}>{numCups}</Text>
            <Image source={require("../assets/AppImages/cup.png")} />
          </View>
        );
      } else if (numContainers > 0) {
        return (
          <View style={styles.variableContent}>
            <Text style={styles.number}>{numContainers}</Text>
            <Image source={require("../assets/AppImages/container.png")} />
          </View>
        );
      } else {
        return null;
      }
    }
  }

  function renderLocation() {
    if (location === undefined) {
      return null;
    } else {
      return (
        <View style={styles.underlined}>
          <Text style={{ color: colors.darkGrey, fontSize: 18 }}>
            Location:{"  "}
            <Text style={{ color: colors.black, fontSize: 18 }}>
              {location}
            </Text>
          </Text>
        </View>
      );
    }
  }

  function renderText() {
    if (text === undefined) {
      return null;
    } else {
      return <Text style={styles.text}>{text}</Text>;
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.white, paddingHorizontal: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.box}>
        <Icon
          containerStyle={{ marginBottom: 20 }}
          name="checkcircle"
          type="antdesign"
          color="#0CF574"
          size={80}
        />

        <Text style={[styles.header, { marginBottom: 20 }]}>{header}</Text>

        <View style={styles.underlined}>
          <Text style={{ color: colors.darkGrey, fontSize: 18 }}>
            Date:{"  "}
            <Text style={{ color: colors.black, fontSize: 18 }}>
              ({moment().format("ddd")}) {moment().format("DD/MM/YYYY")}
            </Text>
          </Text>
        </View>
        <View style={styles.underlined}>
          <Text style={{ color: colors.darkGrey, fontSize: 18 }}>
            Time:{"  "}
            <Text style={{ color: colors.black, fontSize: 18 }}>
              {moment().format("hh:mm a")}
            </Text>
          </Text>
        </View>

        {renderLocation()}
        {renderContent()}
        {renderText()}

        <TouchableOpacity
          style={[globalStyles.button, { width: "100%", alignSelf: "center" }]}
          onPress={() => {
            if (isReturn) {
              // Ensures that previous state of initial screen is cleared
              navigation.dispatch(
                StackActions.replace("Temp Return Selection Screen")
              );
            } else {
              navigation.dispatch(StackActions.popToTop());
            }
            navigation.navigate("Home Screen");
          }}
        >
          <Text style={globalStyles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  box: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.black,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
  },
  underlined: {
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 10,
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
    marginRight: 40,
  },
  variableContent: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
