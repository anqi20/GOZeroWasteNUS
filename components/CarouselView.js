import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const CARD_WIDTH = Dimensions.get("window").width - 40;
const CARD_HEIGHT = 200;

function CardItem({ item, index }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      key={index}
      onPress={() => navigation.navigate("Stats Screen")}
    >
      <Text style={styles.header}>{item.title}</Text>
      <View>{renderContent(item.title)}</View>
    </TouchableOpacity>
  );
}

function renderContent(title) {
  if (title === "Containers borrowed:") {
    return (
      <View style={styles.cardContentView}>
        <Text style={[styles.redNumber, { marginRight: 25 }]}>3</Text>
        <Icon name="cube" type="font-awesome" size={60} color="black" />
      </View>
    );
  } else if (title === "Cups borrowed:") {
    return (
      <View style={styles.cardContentView}>
        <Text style={styles.redNumber}>3</Text>
        <Icon name="cup" type="material-community" size={60} color="black" />
      </View>
    );
  } else if (title === "Credits:") {
    return (
      <View style={styles.cardContentView}>
        <Text style={styles.redNumber}>128</Text>
        <Icon
          name="money-bill-alt"
          type="font-awesome-5"
          size={50}
          color="black"
        />
        <Text style={styles.redNumber}>3</Text>
        <Icon name="coins" type="font-awesome-5" size={50} color="black" />
      </View>
    );
  }
}

export default function CarouselView() {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={({ item, index }) => <CardItem item={item} index={index} />}
        sliderWidth={CARD_WIDTH}
        itemWidth={CARD_WIDTH}
        itemHeight={CARD_HEIGHT}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    padding: 20,
    justifyContent: "space-around",
  },
  cardContentView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: colors.black,
  },
  header: {
    fontSize: 18,
    // fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 10,
  },
  redNumber: {
    fontSize: 48,
    color: colors.red,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
});

const data = [
  {
    title: "Containers borrowed:",
  },
  {
    title: "Cups borrowed:",
  },
  {
    title: "Credits:",
  },
];
