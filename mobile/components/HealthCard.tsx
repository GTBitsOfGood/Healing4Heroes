import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import shadowStyle from "../utils/styles";

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
    <View style={[styles.cardContainer, shadowStyle.shadow]}>
      <View style={styles.cardImgContainer}>
        {animalImage && (
          <Image
            source={{
              uri: animalImage,
            }}
            style={[styles.cardImg, shadowStyle.shadow]}
          />
        )}
        {!animalImage && (
          <View style={styles.cardImg}>
            <FontAwesome5 name="dog" size={37.5} color="black" />
          </View>
        )}
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
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontFamily: "DMSans-Bold",
  },

  linkText: {
    fontWeight: "200",
  },
});

export default HealthCard;
