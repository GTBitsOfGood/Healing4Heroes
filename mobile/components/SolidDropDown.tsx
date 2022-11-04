import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
interface SolidDropDownProps {
  items: Record<string, string>;
  isMultiselect: boolean;
  callbackFunction: (value: string[] | string, key: string[] | string) => void;
  showAllValues?: boolean;
  placeholder?: string;
}
export default function SolidDropDown({
  items,
  isMultiselect,
  placeholder,
  callbackFunction,
  showAllValues,
}: SolidDropDownProps) {
  const [fieldValue, setFieldValue] = React.useState(placeholder);
  const [selectedOptions, setSelectedOptions] = React.useState<Set<string>>(
    new Set()
  );
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => {
          setOpen(!open);
          Keyboard.dismiss();
        }}
      >
        {fieldValue === placeholder ? (
          <Text style={styles.fieldValue}>{fieldValue}</Text>
        ) : (
          <Text>{fieldValue}</Text>
        )}
        <Ionicons
          name="chevron-down-outline"
          size={24}
          color="black"
          style={styles.dropdownArrow}
        />
      </TouchableOpacity>

      <View style={styles.dropDownItemsContainer}>
        {open &&
          Object.keys(items).map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const selectedOptionsCopy = selectedOptions;
                  if (isMultiselect) {
                    // Handle select / unselect item for multiselect
                    if (selectedOptions.has(item)) {
                      selectedOptionsCopy.delete(item);
                      setSelectedOptions(new Set([...selectedOptionsCopy]));
                    } else {
                      selectedOptionsCopy.add(item);
                      setSelectedOptions(new Set([...selectedOptionsCopy]));
                      setFieldValue(item);
                    }
                    // handle dropdown value
                    if (selectedOptionsCopy.size > 1) {
                      if (showAllValues) {
                        setFieldValue(
                          Array.from(selectedOptionsCopy).join(", ")
                        );
                      } else {
                        setFieldValue("Multiple Values Selected");
                      }
                    } else if (selectedOptionsCopy.size == 1) {
                      const setVals = selectedOptionsCopy.values();
                      setFieldValue(setVals.next().value);
                    } else {
                      setFieldValue(placeholder);
                    }

                    const values: string[] = [];
                    for (const key of selectedOptionsCopy) {
                      values.push(items[key]);
                    }
                    callbackFunction(values, Array.from(selectedOptionsCopy));
                  } else {
                    selectedOptionsCopy.clear();
                    selectedOptionsCopy.add(item);
                    setFieldValue(item);
                    setSelectedOptions(new Set([...selectedOptionsCopy]));
                    callbackFunction(
                      items[item],
                      Array.from(selectedOptionsCopy)
                    );
                    setOpen(!open);
                  }
                }}
              >
                <View style={styles.itemContainer}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                  {selectedOptions.has(item) && (
                    <Entypo
                      name="check"
                      size={24}
                      color="black"
                      style={styles.checkMark}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownArrow: {
    marginLeft: "auto",
  },
  checkMark: {
    marginLeft: "auto",
    padding: 10,
  },
  fieldValue: {
    color: "#999999",
  },
  dropdownItem: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  dropDownItemsContainer: {
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
});
