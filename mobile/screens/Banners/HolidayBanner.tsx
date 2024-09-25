import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HOLIDAYS } from '../../utils/types';

const HolidayBanner = () => {
  const [holidayBanner, setHolidayBanner] = useState<{ name: string, message: string } | null>(null);

  useEffect(() => {
    function checkForHoliday() {
      const today = new Date();
      const holiday = HOLIDAYS.find(
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
    backgroundColor: "#3F3BED",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    opacity: 0.9
  },
  holidayTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  },
  holidayMessage: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center"
  },
});

export default HolidayBanner;
