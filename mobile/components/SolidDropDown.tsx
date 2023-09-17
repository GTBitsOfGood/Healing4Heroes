import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        {open === false ? (
          <Ionicons
            name="chevron-down-outline"
            size={24}
            color="black"
            style={styles.dropdownArrow}
          />
        ) : (
          <Ionicons
            name="chevron-up-outline"
            size={24}
            color="black"
            style={styles.dropdownArrow}
          />
        )}
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
                  <View
                    style={[
                      styles.dropdownItem,
                      selectedOptions.has(item) && styles.dropdownItemSelected,
                      index === 0 && styles.roundedItemFirst,
                      Object.keys(items).length - 1 === index &&
                        styles.roundedItemLast,
                    ]}
                  >
                    <Text
                      style={[
                        selectedOptions.has(item) &&
                          styles.dropdownItemSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemSelected: {
    backgroundColor: "#EEEDFD",
    color: "#3F3BED",
  },
  dropDownItemsContainer: {
    marginTop: 5,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
  },

  roundedItemFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  roundedItemLast: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
