import { StyleSheet, Pressable, View, Text } from "react-native";
import { useContext } from "react";

import { Theme } from "./Theme";

export default function UtilButton({ onPress, text }) {
  const theme = useContext(Theme);

  return (
    <View style={styles.buttonView}>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: theme === "light" ? "cornflowerblue" : "#344c78",
        }}
        android_ripple={{
          borderless: true,
        }}
        onPressIn={onPress}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: theme === "light" ? "#262626" : "lightgrey",
          }}
        >
          {text}
        </Text>
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
    fontSize: 13,
  },
  button: {
    padding: 10,
  },
});
