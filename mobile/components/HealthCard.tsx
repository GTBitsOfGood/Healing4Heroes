import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

interface HealthCardProps {
  handlerName: string;
  animalName: string;
  animalAge: string;
  animalImage: string;
}

const HealthCard = ({
  handlerName,
  animalName,
  animalAge,
  animalImage,
}: HealthCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImgContainer}>
        <Image
          source={{
            uri: animalImage,
          }}
          style={styles.cardImg}
        />
      </View>
      <View style={styles.cardInfoContainer}>
        <Text style={styles.text}>{handlerName}</Text>
        <Text style={styles.text}>{animalName}</Text>
        <Text style={styles.text}>{animalAge}</Text>
        <Text style={styles.linkText}>View Details </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  cardImgContainer: {
    flexGrow: 1,
    paddingLeft: 20,
    justifyContent: "center",
    alignContent: "center",
  },

  cardInfoContainer: {
    paddingVertical: 20,
    flexGrow: 2,
    justifyContent: "space-around",
    alignContent: "center",
  },

  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  text: {
    fontFamily: "DMSans-Bold",
  },

  linkText: {
    fontWeight: "200",
  },
});

export default HealthCard;
