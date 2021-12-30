import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import colors from "../assets/colors";
import moment from "moment";
import { renderAllDates } from "../screens/BasicApi";

const CARD_WIDTH = Dimensions.get("window").width - 40;
const CARD_HEIGHT = 200;

function CardItem({ item, index, containerDate, cupDate }) {
  return (
    <View style={styles.cardContainer} key={index}>
      <Text style={styles.header}>{item.title}</Text>
      {renderContent({ item, containerDate, cupDate })}
    </View>
  );
}

function renderDate(dates) {
  var currDate = moment();

  // Check if there are any entries in the dates
  if (dates.length == 0) {
    return (
      <Text style={{ fontSize: 18 }}></Text> // To prevent formatting issues
    );
  } else {
    var earlistDueDate = moment(dates[0].dueDate, "DD/MM/YYYY");
  }

  var duration = moment.duration(earlistDueDate.diff(currDate));
  var daysDiff = duration.asDays();

  if (daysDiff > 3) {
    // Due date more than 3 days away from today
    return (
      <Text style={{ fontSize: 18 }}></Text> // To prevent formatting issues
    );
  } else if (daysDiff <= 3 && daysDiff > 0) {
    // Due date is 3 days away from today (exclusive)
    return (
      <Text style={{ color: "orange", textAlign: "center", fontSize: 18 }}>
        {earlistDueDate.format("DD/MM/YYYY")}
      </Text>
    );
  } else {
    // Overdue
    return (
      <Text style={{ color: "red", textAlign: "center", fontSize: 18 }}>
        {earlistDueDate.format("DD/MM/YYYY")}
      </Text>
    );
  }
}

function renderContent({ item, containerDate, cupDate }) {
  var containerNum = 0;
  var cupNum = 0;

  // Get collective number of containers and cups borrowed
  for (let i = 0; i < containerDate.length; i++) {
    containerNum += containerDate[i].numContainers;
  }
  for (let i = 0; i < cupDate.length; i++) {
    cupNum += cupDate[i].numCups;
  }

  if (item.title === "Items borrowed:") {
    return (
      <View style={styles.cardContentView}>
        <View style={styles.dateContainer}>
          {renderDate(containerDate)}
          <View style={styles.numIconContainer}>
            <Text style={styles.redNumber}>{containerNum}</Text>
            <Image source={require("../assets/AppImages/container.png")} />
          </View>
        </View>
        <View style={styles.dateContainer}>
          {renderDate(cupDate)}
          <View style={styles.numIconContainer}>
            <Text style={styles.redNumber}>{cupNum}</Text>
            <Image source={require("../assets/AppImages/cup.png")} />
          </View>
        </View>
      </View>
    );
  } else if (item.title === "Containers borrowed:") {
    return (
      <View style={styles.cardContentView}>
        <View style={styles.numIconContainer}>
          <Text style={styles.redNumber}>{containerNum}</Text>
          <Image source={require("../assets/AppImages/container.png")} />
        </View>
        <View style={{ marginLeft: 30, flex: 1 }}>
          <Text>Return by:{"\n"}</Text>
          {renderAllDates(containerDate)}
        </View>
      </View>
    );
  } else if (item.title === "Cups borrowed:") {
    return (
      <View style={styles.cardContentView}>
        <View style={styles.numIconContainer}>
          <Text style={styles.redNumber}>{cupNum}</Text>
          <Image source={require("../assets/AppImages/cup.png")} />
        </View>
        <View style={{ marginLeft: 30, flex: 1 }}>
          <Text>Return by:{"\n"}</Text>
          {renderAllDates(cupDate)}
        </View>
      </View>
    );
  }
}

export default function CarouselView({ containerDate, cupDate }) {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={({ item, index }) => (
          <CardItem
            item={item}
            index={index}
            containerDate={containerDate}
            cupDate={cupDate}
          />
        )}
        sliderWidth={CARD_WIDTH}
        itemWidth={CARD_WIDTH}
        itemHeight={CARD_HEIGHT}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        loop={false}
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
  numIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const data = [
  {
    title: "Items borrowed:",
  },
  {
    title: "Containers borrowed:",
  },
  {
    title: "Cups borrowed:",
  },
];
