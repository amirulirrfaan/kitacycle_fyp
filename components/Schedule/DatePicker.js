import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const DatePicker = ({ label, value, onDateChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirmDate = (selectedDate) => {
    setDatePickerVisibility(false);
    onDateChange(selectedDate);
  };

  return (
    <>
      {/* Date Input */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDatePickerVisibility(true)}
      >
        <FontAwesome5
          name="calendar-alt"
          size={20}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text>{value ? value.toLocaleDateString() : label}</Text>
      </TouchableOpacity>

      {/* Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
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

export default DatePicker;
