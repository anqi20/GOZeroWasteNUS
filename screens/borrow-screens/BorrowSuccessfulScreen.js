import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { UserContext } from "../../assets/UserContext";
import { uploadBorrowData } from "./BorrowApi";

export default function BorrowSuccessfulScreen({ route }) {
  const userData = useContext(UserContext);
  const { numCups, numContainers } = route.params;
  // console.log(userData.id);
  useEffect(() => {
    uploadBorrowData(userData.id, numCups, numContainers);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.header}>Borrow</Text>
      <SuccessBox numCups={numCups} numContainers={numContainers} />
      <FooterText />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
  },
});
