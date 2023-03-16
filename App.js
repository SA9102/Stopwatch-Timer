import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useState } from "react";

import { Theme } from "./components/Theme";
import Stopwatch from "./components/sections/Stopwatch";
import Timer from "./components/sections/Timer";
import Panel from "./components/Panel";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [section, setSection] = useState("stopwatch");

  const handleChangeSection = (newSection) => {
    setSection(newSection);
  };

  return (
    <Theme.Provider value={theme}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme === "light" ? "whitesmoke" : "#262626",
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.optionsButton,
            backgroundColor: theme === "light" ? "lightgreen" : "#497a49",
          }}
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Text style={{ color: "#262626" }}>Switch Theme</Text>
        </TouchableOpacity>
        {section === "stopwatch" ? (
          <Stopwatch />
        ) : section === "timer" ? (
          <Timer />
        ) : null}
        <StatusBar style="auto" />
        <Panel onChangeSection={handleChangeSection} />
      </View>
    </Theme.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsButton: {
    position: "absolute",
    bottom: 75,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
});
