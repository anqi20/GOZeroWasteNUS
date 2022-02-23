import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { setStallNames } from "./SettingsApi";

export default function StallsScreen() {
  const [state, setState] = useState({ activeSections: [] });
  const [locations, setLocations] = useState({ locations: [] });
  const [stalls, setStalls] = useState({ stalls: [] });

  const _renderHeader = (section) => (
    <View style={styles.locations}>
      <Text style={styles.locationsText}>{section.location}</Text>
    </View>
  );

  const _renderContent = (section) => {
    return section.stalls.map((item, index) => {
      return (
        <View style={styles.stalls}>
          <Text style={styles.stallsText}>{item}</Text>
        </View>
      );
    });
  };

  const _updateSections = (activeSections) => {
    setState({ activeSections });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Accordion
            sections={sample}
            activeSections={state.activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const sample = [
  {
    location: "TechnoEdge",
    stalls: [
      "Mixed Rice",
      "Vegetarian",
      "Fresh fruits & juices",
      "Taiwanese",
      "Indian",
      "Chicken Rice",
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  locations: {
    padding: 10,
  },
  locationsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stalls: {
    backgroundColor: "#fff",
    padding: 10,
  },
  stallsText: {
    fontSize: 15,
  },
});
