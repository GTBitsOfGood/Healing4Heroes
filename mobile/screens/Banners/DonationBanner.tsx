import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import dayjs from 'dayjs';
import { DONATIONS } from '../../utils/types';
import weekOfYear from 'dayjs/plugin/weekOfYear';

const donationBanner = () => {
  const [donationBanner, setDonationBanner] = useState<{ name: string, message: string } | null>(null);

  useEffect(() => {
    function updateDonationMessage() {
        const today = new Date();
        dayjs.extend(weekOfYear);

        const week = dayjs(today).week();
        const donation = DONATIONS[week % DONATIONS.length]
        if (donation) {
            setDonationBanner({ name: donation.name, message: donation.message });
        } else {
            setDonationBanner(null);
        }
    }

    updateDonationMessage();
  }, []);

  if (!donationBanner) return null;

  return (
    <View style={styles.donationBanner}>
      <Text style={styles.donationTitle}>{donationBanner.name}!</Text>
      {donationBanner.message ? (
        <Text style={styles.donationMessage}>{donationBanner.message}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('https://www.paypal.me/Healing4Heroes?locale.x=en_US')}>
            <Text style={styles.buttonText}>Paypal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('https://venmo.com/u/HealingForHeroes-Nonprofit')}>
            <Text style={styles.buttonText}>Venmo</Text>
      </TouchableOpacity>
   </View>
  );
};
 
const styles = StyleSheet.create({
    donationBanner: {
        borderRadius: 10,
        backgroundColor: "#3F3BED",
        marginBottom: 10,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        opacity: 0.9
    },
    donationTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center"
    },
    donationMessage: {
        color: "white",
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center"
    },
    button: {
        backgroundColor: '#807efb',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 3,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
    },
  });
  
  export default donationBanner;
  
