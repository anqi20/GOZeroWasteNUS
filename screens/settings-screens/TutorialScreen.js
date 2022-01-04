import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

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

export default function TutorialScreen({ navigation }) {
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
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
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
    title: "How to borrow?",
  },
  {
    id: "1",
    title: "How to return?",
  },
];
