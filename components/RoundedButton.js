import { StyleSheet, View, Pressable, Text } from "react-native";
import { useContext } from "react";

import { Theme } from "./Theme";

export default function RoundedButton({ onPress, text }) {
  const theme = useContext(Theme);

  return (
    <View style={styles.buttonView}>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: theme === "light" ? "coral" : "#8a472c",
        }}
        android_ripple={{
          borderless: true,
        }}
        onPressIn={onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    margin: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 17,
    color: "#262626",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
});
