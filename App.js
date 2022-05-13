import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Logo4 from './assets/Logo4.png';

export default function App() {
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");
  return (
    <View style={styles.container}>
      <QRCode
        value={qrValue ?qrValue : 'NA'}
        size={290}
        color="red"
        backgroundColor="black"
        logo = {Logo4}
        logoSize={50}
        logoMargin = {2}
        logoBorderRadius = {15}
        logoBackgroundColor = "black"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setInput(text);
        }}
      />
      <TouchableOpacity onPress={() =>{setQrValue(input)}}>
        <Text>Generate Qr Codes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input:{
    // width: 70,
    height: 70
  }
});
