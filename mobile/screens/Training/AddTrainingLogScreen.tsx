import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BubbleList from "../../components/BubbleList";
import SolidDropDown from "../../components/SolidDropDown";
import StepOverlay from "../../components/Overlays/StepOverlay";
import { ServiceAnimalSkills } from "../../utils/types";
import LogOverlay from "../../components/Overlays/LogOverlay";

export default function AddTrainingLogScreen(props: any) {
  const [totalHours, setTotalHours] = useState("");
  const [skillKeysSelected, setSkillKeysSelected] = useState<string[]>([]);
  const [skillValuesSelected, setSkillValuesSelected] = useState<string[]>([]);
  const [behaviorKeysSelected, setBehaviorKeysSelected] = useState<string[]>(
    []
  );
  const [behaviorValuesSelected, setBehaviorValuesSelected] = useState<
    string[]
  >([]);

  const [error, setError] = useState("");

  const validateInput = () => {
    if (!totalHours) {
      setError("Please enter your total hours.");
      return;
    } else if (!skillKeysSelected) {
      setError("Please select at least one skill displayed.");
      return;
    } else if (!behaviorKeysSelected) {
      setError("Please select at least one dog behavior");
    } else {
      setError("");
      return true;
    }
  };

  const submitTrainingLogInfo = () => {
    const validInput = validateInput();
    if (validInput) {
      props.navigation.navigate("Upload Video Log", {
        totalHours: totalHours,
        skillValuesSelected: skillValuesSelected,
        behaviorValuesSelected: behaviorValuesSelected,
      });
    }
  };

  return (
    <LogOverlay
      headerName={"Create New Training Log"}
      error={error}
      circleCount={2}
      numberSelected={1}
      buttonFunction={submitTrainingLogInfo}
      pageBody={
        <View style={styles.container}>
          <Text style={styles.label}>Total Training Hours*</Text>
          <TextInput
            style={styles.input}
            value={totalHours}
            onChangeText={setTotalHours}
            placeholder="Enter Hours Trained"
            placeholderTextColor={"#999999"}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Skills Displayed*</Text>
          <SolidDropDown
            items={{
              "Post/Block": ServiceAnimalSkills.SKILL_POST_BLOCK,
              "Lead/Follow": ServiceAnimalSkills.SKILL_LEAD_FOLLOW,
              "Stay/Sit/Down": ServiceAnimalSkills.SKILL_STAY_SIT_DOWN,
              Touch: ServiceAnimalSkills.SKILL_TOUCH,
              Tuck: ServiceAnimalSkills.SKILL_TUCK,
              Heel: ServiceAnimalSkills.SKILL_HEEL,
            }}
            isMultiselect={true}
            placeholder="Select to Add"
            callbackFunction={(
              values: string[] | string,
              keys: string[] | string
            ) => {
              setSkillValuesSelected([...(values as string[])]);
              setSkillKeysSelected([...keys]);
            }}
          />

          <BubbleList items={skillKeysSelected} />

          <Text style={styles.label}>Behavior Description*</Text>
          <SolidDropDown
            items={{
              "Post/Block": ServiceAnimalSkills.SKILL_POST_BLOCK,
              "Lead/Follow": ServiceAnimalSkills.SKILL_LEAD_FOLLOW,
              "Stay/Sit/Down": ServiceAnimalSkills.SKILL_STAY_SIT_DOWN,
              Touch: ServiceAnimalSkills.SKILL_TOUCH,
              Tuck: ServiceAnimalSkills.SKILL_TUCK,
              Heel: ServiceAnimalSkills.SKILL_HEEL,
            }}
            isMultiselect={true}
            placeholder="Select to Add"
            callbackFunction={(
              values: string[] | string,
              keys: string[] | string
            ) => {
              setBehaviorValuesSelected([...(values as string[])]);
              setBehaviorKeysSelected([...keys]);
            }}
          />

          <BubbleList items={behaviorValuesSelected} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  buttonRowContainer: {
    flexDirection: "row",
  },
  multiSelectButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 8,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    marginBottom: 0,
  },
  behaviorInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 90,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    alignContent: "center",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#666666",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  failedContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    minWidth: "85%",
    backgroundColor: "#D9D9D9",
  },
  failedText: {
    fontSize: 12,
    fontWeight: "300",
  },
  circles: {
    marginTop: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 3,
  },
  selected: {
    backgroundColor: "#666666",
  },
});
