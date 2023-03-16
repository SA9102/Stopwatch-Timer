import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";

import { Theme } from "./Theme";

export default function Panel({ onChangeSection }) {
  const theme = useContext(Theme);

  return (
    <View
      style={{
        ...styles.panel,
        backgroundColor: theme === "light" ? "#e0e0e0" : "#171717",
      }}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChangeSection("stopwatch")}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: theme === "light" ? "coral" : "#8a472c",
          }}
        >
          STOPWATCH
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChangeSection("timer")}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: theme === "light" ? "coral" : "#8a472c",
          }}
        >
          TIMER
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "coral",
  },
});
