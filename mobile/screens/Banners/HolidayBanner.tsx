import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const holidays = [
  { name: "National Donut Day!", message: "It is national donut day! The office would appreciate donuts!", month: 5, day: 6},
  { name: "Happy Memorial Day!", message: "Remember those who sacrificed for our freedom", month: 4, day: 26 },
  { name: "Happy 4th of July!", message: "", month: 6, day: 4 },
  { name: "Happy Veterans Day!", message: "Thank you to all those who sacrificed for us", month: 10, day: 11 },
];

const HolidayBanner = () => {
  const [holidayBanner, setHolidayBanner] = useState<{ name: string, message: string } | null>(null);

  useEffect(() => {
    function checkForHoliday() {
      const today = new Date();
      const holiday = holidays.find(
        (holiday) =>
          holiday.month === today.getMonth() && holiday.day === today.getDate()
      );
      if (holiday) {
        setHolidayBanner({ name: holiday.name, message: holiday.message });
      } else {
        setHolidayBanner(null);
      }
    }

    checkForHoliday();
  }, []);

  if (!holidayBanner) return null;

  return (
    <View style={styles.holidayBanner}>
      <Text style={styles.holidayTitle}>{holidayBanner.name}!</Text>
      {holidayBanner.message ? (
        <Text style={styles.holidayMessage}>{holidayBanner.message}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  holidayBanner: {
    borderRadius: 10,
    backgroundColor: "#9490fc",
    marginBottom: 10,
    padding: 10,
  },
  holidayTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  holidayMessage: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },
});

export default HolidayBanner;
