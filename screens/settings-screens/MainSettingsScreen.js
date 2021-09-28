import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { globalStyles } from "../../assets/globalStyles";
import firebase from "../../database/firebaseDB";
import { AuthContext } from "../../assets/AuthContext";

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
  const { logOut } = useContext(AuthContext);

  const logoutUser = () => {
    logOut();
  };

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
                <Text style={{ fontSize: 18, marginLeft: 10 }}>
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
          onPress={() => {
            logoutUser();
          }}
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
    title: "Logs",
  },
  {
    id: "2",
    title: "Participating vendors",
  },
  {
    id: "3",
    title: "Terms and conditions",
  },
  {
    id: "4",
    title: "Terminate my account",
  },
];
