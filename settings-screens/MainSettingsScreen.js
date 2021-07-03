import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { globalStyles } from "../assets/globalStyles";

function renderSeparator() {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  );
}

export default function MainSettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.listCell}
                onPress={() => navigation.navigate(item.title)}
              >
                <Text style={{ fontSize: 20, marginLeft: 10 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Log In")}
          style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listCell: {
    padding: 10,
  },
});

const tabs = [
  {
    id: "0",
    title: "Edit account details",
  },
  {
    id: "1",
    title: "How to use?",
  },
  {
    id: "2",
    title: "Logs",
  },
  {
    id: "3",
    title: "Feedback to us!",
  },
  {
    id: "4",
    title: "Location of our collection machines",
  },
  {
    id: "5",
    title: "Participating vendors",
  },
  {
    id: "6",
    title: "Terms and conditions",
  },
  {
    id: "7",
    title: "Terminate my account",
  },
];
