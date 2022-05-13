import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import Logo4 from "./assets/Logo4.png";

export default function App() {
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not Yey scanned");

  
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // request camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // what happens when we scan the barcode
  const handleBarCodeScan = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.warn("type:" + type + "\nData:" + data);
  };

  // check permission and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to Camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        ></Button>
      </View>
    );
  }
const rider = "44445";
  return (
    <View style={styles.container}>
      <QRCode
        value={qrValue ? qrValue : `${rider}`}
        size={290}
        color="black"
        backgroundColor="white"
        logo={Logo4}
        logoSize={50}
        logoMargin={2}
        logoBorderRadius={25}
        logoBackgroundColor="#5D6D7E"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setInput(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setQrValue(input);
        }}
      >
        <Text>Generate Qr Codes</Text>
      </TouchableOpacity>
      <View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScan}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text>{text}</Text>
      {scanned && <Button title={"scan again?"} onPress={() =>setScanned(false)} color="tomato"></Button>}
      
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
  input: {
    // width: 70,
    height: 70,
  },
});
