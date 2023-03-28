import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BubbleList from "../../components/BubbleList";
import SolidDropDown from "../../components/SolidDropDown";
import StepOverlay from "../../components/Overlays/StepOverlay";
import {
  BehaviorTypes,
  Screens,
  ServiceAnimalSkills,
  DropDownType,
} from "../../utils/types";
import DateInput from "../../components/DateInput";

export default function AddTrainingLogScreen(props: any) {
  const [totalHours, setTotalHours] = useState("");
  const [skillKeysSelected, setSkillKeysSelected] = useState<string[]>([]);
  const [skillValuesSelected, setSkillValuesSelected] = useState<string[]>([]);
  const [behavior, setBehaviorValues] = useState<BehaviorTypes[]>([]);
  const [behaviorKeys, setBehaviorKeys] = useState<string[]>([]);
  const [behaviorNote, setBehaviorNote] = useState("");
  const [trainingLogDate, setTrainingLogDate] = useState<Date>(new Date());
  const [error, setError] = useState("");

  const skillsDropDownItems: DropDownType = {
    "Post/Block": ServiceAnimalSkills.SKILL_POST_BLOCK,
    "Lead/Follow": ServiceAnimalSkills.SKILL_LEAD_FOLLOW,
    "Stay/Sit/Down": ServiceAnimalSkills.SKILL_STAY_SIT_DOWN,
    Touch: ServiceAnimalSkills.SKILL_TOUCH,
    Tuck: ServiceAnimalSkills.SKILL_TUCK,
    Heel: ServiceAnimalSkills.SKILL_HEEL,
  };

  if (props.route.params.hoursCompleted > 800) {
    skillsDropDownItems["Wake from nightmares"] =
      ServiceAnimalSkills.SKILL_WAKE_NIGHTMARES;
    skillsDropDownItems["Remind handler to take medicine"] =
      ServiceAnimalSkills.SKILL_REMIND_HANDLER_TAKE_MEDICINE;
    skillsDropDownItems["Sweep room for bad guys"] =
      ServiceAnimalSkills.SKILL_SWEEP_ROOM_BAD_GUYS;
  }

  const validateInput = () => {
    if (!totalHours) {
      setError("Please enter your total hours.");
      return;
    } else if (skillKeysSelected.length === 0) {
      setError("Please select at least one skill displayed.");
      return;
    } else if (behavior.length === 0) {
      setError("Please enter a description of the dog's behavior");
      return;
    } else if (isNaN(trainingLogDate.getTime() as number)) {
      setError("Set a Valid Date!");
      return;
    } else if (trainingLogDate.getDay() < 0 || trainingLogDate.getMonth() < 0) {
      // TODO: handle negative dates
    } else if (trainingLogDate.getFullYear()) {
      //FIXME: fix the condition above - future date not allowed
      setError("Set a date that is not in the future!");
    } else if (
      trainingLogDate.getDay() == 0 ||
      trainingLogDate.getMonth() == 0
    ) {
      // Months and dates should only allow values in a valid range (different allowed date range based on the month)
      setError("Months and dates cannot be zero");
    } else {
      setError("");
      return true;
    }
  };

  const submitTrainingLogInfo = () => {
    const validInput = validateInput();
    if (validInput) {
      props.navigation.navigate(Screens.UPLOAD_VIDEO_LOG_SCREEN, {
        hoursCompleted: props.route.params.hoursCompleted,
        totalHours: totalHours,
        trainingLogDate: trainingLogDate.toString(),
        skillValuesSelected: skillValuesSelected,
        behavior: behavior,
        behaviorNote: behaviorNote,
      });
    }
  };

  return (
    <StepOverlay
      error={error}
      circleCount={2}
      numberSelected={1}
      buttonFunction={submitTrainingLogInfo}
      headerTitle={"Create New Training Log"}
      navigationProp={props.navigation}
      pageBody={
        <View style={styles.container}>
          <Text style={styles.label}>Date of Training Log*</Text>
          <DateInput
            autofill={true}
            callbackFunction={setTrainingLogDate}
          ></DateInput>
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
            items={skillsDropDownItems}
            isMultiselect={true}
            placeholder="Select to Add"
            callbackFunction={(
              values: string[] | string,
              keys: string[] | string
            ) => {
              setSkillValuesSelected([...(values as string[])]);
              setSkillKeysSelected([...(keys as string[])]);
            }}
          />

          <BubbleList items={skillKeysSelected} />

          <Text style={styles.label}>Behavior Type*</Text>
          <SolidDropDown
            items={{
              "No Negative Behavior": BehaviorTypes.NO_NEGATIVE_BEHAVIOR,
              Biting: BehaviorTypes.BITING,
              "Unprovoked Barking": BehaviorTypes.UNPROVOKED_BARKING,
              "Aggressive Pulling": BehaviorTypes.AGGRESSIVE_PULLING,
              "Uncontrolled Jumping": BehaviorTypes.UNCONTROLLED_JUMPING,
              "Getting Into Trash / Toilet": BehaviorTypes.GETTING_TRASH_TOILET,
              "Growling or Showing Aggressive Behavior":
                BehaviorTypes.GROWLING_AGGRESSIVE_BEHAVIOR,
              Other: BehaviorTypes.OTHER,
            }}
            isMultiselect={true}
            placeholder="Select to Add"
            callbackFunction={(
              values: string[] | string,
              keys: string[] | string
            ) => {
              setBehaviorValues([...(values as BehaviorTypes[])]);
              setBehaviorKeys([...(keys as string[])]);
            }}
          />
          <BubbleList items={behaviorKeys} />

          <Text style={styles.label}>Behavior Description</Text>
          <TextInput
            style={styles.input}
            value={behaviorNote}
            onChangeText={setBehaviorNote}
            placeholder="Enter Behavior Description"
            placeholderTextColor={"#999999"}
          />
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
