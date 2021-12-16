import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import colors from "../assets/colors";
import { Entypo } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

export default function SelectionComponent({
  hasContainers,
  hasCups,
  cupQuota,
  containerQuota,
  numCups,
  numContainers,
  setCupNum,
  setContainerNum,
}) {
  function Container() {
    return (
      <Image
        source={require("../assets/AppImages/container.png")}
        style={{ marginRight: 10 }}
      />
    );
  }

  function Cup() {
    return (
      <Image
        source={require("../assets/AppImages/cup.png")}
        style={{ marginRight: 10 }}
      />
    );
  }

  const [isOverQuota, setBoolean] = useState(false);

  function CupSelector({ cupQuota, numCups, setCupNum }) {
    function increment() {
      if (numCups >= cupQuota) {
        setBoolean(true);
      } else {
        setCupNum(numCups + 1);
        setBoolean(false);
      }
    }

    function decrement() {
      if (numCups <= 0) {
        return null;
      } else {
        setCupNum(numCups - 1);
        setBoolean(false);
      }
    }

    return (
      <View style={styles.iconAndSelector}>
        <Cup />
        <View style={styles.selectorContainer}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Entypo name="minus" size={36} color="black" />
          </TouchableOpacity>
          <Text style={styles.countText}>{numCups}</Text>
          <TouchableOpacity style={styles.button} onPress={increment}>
            <Entypo name="plus" size={36} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function ContainerSelector({
    containerQuota,
    numContainers,
    setContainerNum,
  }) {
    function increment() {
      if (numContainers >= containerQuota) {
        setBoolean(true);
      } else {
        setContainerNum(numContainers + 1);
        setBoolean(false);
      }
    }

    function decrement() {
      if (numContainers <= 0) {
        return null;
      } else {
        setContainerNum(numContainers - 1);
        setBoolean(false);
      }
    }

    return (
      <View style={styles.iconAndSelector}>
        <Container />
        <View style={styles.selectorContainer}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Entypo name="minus" size={36} color="black" />
          </TouchableOpacity>
          <Text style={styles.countText}>{numContainers}</Text>
          <TouchableOpacity style={styles.button} onPress={increment}>
            <Entypo name="plus" size={36} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderSelector() {
    if (hasContainers && hasCups) {
      return (
        <View>
          <ContainerSelector
            containerQuota={containerQuota}
            numContainers={numContainers}
            setContainerNum={setContainerNum}
          />
          <CupSelector
            cupQuota={cupQuota}
            numCups={numCups}
            setCupNum={setCupNum}
          />
        </View>
      );
    } else if (hasContainers) {
      return (
        <ContainerSelector
          containerQuota={containerQuota}
          numContainers={numContainers}
          setContainerNum={setContainerNum}
        />
      );
    } else if (hasCups) {
      return (
        <CupSelector
          cupQuota={cupQuota}
          numCups={numCups}
          setCupNum={setCupNum}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      {renderSelector()}
      {isOverQuota ? (
        <Text style={{ color: colors.red, textAlign: "center" }}>
          You cannot select more than this number. {"("}For borrows{")"} Return
          the ones you have to borrow more!
        </Text>
      ) : null}
    </View>
  );
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
