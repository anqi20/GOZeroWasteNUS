import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

  function CupSelector({ cupQuota, numCups, setCupNum }) {
    function increment() {
      if (numCups >= cupQuota) {
        // When quota is exceeded navigate to over quota error screen
        // navigation.navigate("");
      } else {
        // setCupCount(cupCount + 1);
        setCupNum(numCups + 1);
      }
    }

    function decrement() {
      if (numCups <= 0) {
        return null;
      } else {
        // setCupCount(cupCount - 1);
        setCupNum(numCups - 1);
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
        // When quota is exceeded navigate to over quota error screen
        // navigation.navigate("");
      } else {
        // setContainerCount(containerCount + 1);
        setContainerNum(numContainers + 1);
      }
    }

    function decrement() {
      if (numContainers <= 0) {
        return null;
      } else {
        // setContainerCount(containerCount - 1);
        setContainerNum(numContainers - 1);
      }
    }

    return (
      <View style={styles.iconAndSelector}>
        <Cube />
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
