import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useContext } from "react";

import { Theme } from "./Theme";

export default function LapView({ laps }) {
  const theme = useContext(Theme);

  return (
    <View style={styles.lapsContainer}>
      {laps.length > 0 ? (
        <Text style={{ color: theme === "light" ? "#262626" : "lightgrey" }}>
          Laps
        </Text>
      ) : (
        <Text></Text>
      )}
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {laps.map((lap, index) => (
            <View
              style={{
                ...styles.lapItemEven,
                ...(index % 2 === 0 && {
                  backgroundColor: theme === "light" ? "#ededed" : "#171717",
                }),
              }}
            >
              <Text
                style={{
                  ...styles.lapNum,
                  color: theme === "light" ? "#262626" : "lightgrey",
                }}
              >
                {laps.length - index}
              </Text>
              <Text
                style={{
                  ...styles.lapTime,
                  color: theme === "light" ? "coral" : "#8a472c",
                }}
              >
                {lap}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lapsContainer: {
    alignItems: "center",
    gap: 10,
    width: "80%",
  },
  scrollContainer: {
    height: 300,
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  lapItemEven: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  lapItemOdd: {
    paddingVertical: 12,
    backgroundColor: "#ededed",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  lapNum: {
    fontSize: 15,
    textAlign: "center",
  },
  lapTime: {
    fontSize: 25,
    textAlign: "center ",
  },
});
