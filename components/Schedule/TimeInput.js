import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const TimePicker = ({ label, value, onTimeChange }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleConfirmTime = (selectedTime) => {
    setTimePickerVisibility(false);
    onTimeChange(selectedTime.toTimeString().split(" ")[0]);
  };

  return (
    <>
      {/* Time Input */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setTimePickerVisibility(true)}
      >
        <FontAwesome5
          name="clock"
          size={20}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text>{value ? value : label}</Text>
      </TouchableOpacity>

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#818181",
    color: "#818181",
    borderRadius: 8,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default TimePicker;
