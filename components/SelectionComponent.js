import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

function Selector({ isCupCounter, cupQuota, containerQuota }) {
  const navigation = useNavigation();

  const [count, setCount] = useState(0);

  function increment() {
    if (isCupCounter) {
      if (count >= cupQuota) {
        // When quota is exceeded navigate to over quota error screen
        // navigation.navigate("");
      } else {
        setCount(count + 1);
      }
    } else {
      if (count >= containerQuota) {
        // When quota is exceeded navigate to over quota error screen
        // navigation.navigate("");
      } else {
        setCount(count + 1);
      }
    }
  }

  function decrement() {
    if (isCupCounter) {
      if (count <= 0) {
        return null;
      } else {
        setCount(count - 1);
      }
    } else {
      if (count <= 0) {
        return null;
      } else {
        setCount(count - 1);
      }
    }
  }

  return (
    <View style={styles.selectorContainer}>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Entypo name="minus" size={36} color="black" />
      </TouchableOpacity>
      <Text style={styles.countText}>{count}</Text>
      <TouchableOpacity style={styles.button} onPress={increment}>
        <Entypo name="plus" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default function SelectionComponent({
  hasContainers,
  hasCups,
  cupQuota,
  containerQuota,
}) {
  function Cube() {
    return (
      <Icon
        name="cube"
        type="font-awesome"
        size={60}
        color="black"
        containerStyle={{ marginRight: 20 }}
      />
    );
  }

  function Cup() {
    return (
      <Icon
        name="cup"
        type="material-community"
        size={60}
        color="black"
        containerStyle={{ marginRight: 20 }}
      />
    );
  }

  function renderSelector() {
    if (hasContainers && hasCups) {
      return (
        <View>
          <View style={styles.iconAndSelector}>
            <Cube />
            <Selector
              isCupCounter={false}
              cupQuota={cupQuota}
              containerQuota={containerQuota}
            />
          </View>
          <View style={styles.iconAndSelector}>
            <Cup />
            <Selector
              isCupCounter={true}
              cupQuota={cupQuota}
              containerQuota={containerQuota}
            />
          </View>
        </View>
      );
    } else if (hasContainers) {
      return (
        <View style={styles.iconAndSelector}>
          <Cube />
          <Selector
            isCupCounter={false}
            cupQuota={cupQuota}
            containerQuota={containerQuota}
          />
        </View>
      );
    } else if (hasCups) {
      return (
        <View style={styles.iconAndSelector}>
          <Cup />
          <Selector
            isCupCounter={true}
            cupQuota={cupQuota}
            containerQuota={containerQuota}
          />
        </View>
      );
    }
  }

  return <View style={styles.container}>{renderSelector()}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 20,
  },
  selectorContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconAndSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  button: {
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countText: {
    fontSize: 36,
    marginHorizontal: 10,
  },
});
