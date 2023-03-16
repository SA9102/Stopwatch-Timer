import { StyleSheet, Text, View } from "react-native";

import { useState, useRef, useEffect, useContext } from "react";

import { Theme } from "../Theme";
import RoundedButton from "../RoundedButton";
import LapView from "../LapView";

export default function Stopwatch() {
  const theme = useContext(Theme);
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);

  const intervalId = useRef(0);

  const totalSeconds =
    totalMilliseconds < 10 ? 0 : Number(String(totalMilliseconds).slice(0, -1));
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const time = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${String(
    totalMilliseconds
  ).slice(-1)}`;

  useEffect(() => {
    if (timerRunning) {
      intervalId.current = setInterval(() => {
        setTotalMilliseconds((totalMilliseconds) => totalMilliseconds + 1);
      }, 100);
    } else {
      clearInterval(intervalId.current);
    }
  }, [timerRunning]);

  const handleResetTime = () => {
    setTotalMilliseconds(0);
    setLaps([]);
  };

  const handleAddLap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <>
      <Text
        style={{
          ...styles.timer,
          color: theme === "light" ? "#262626" : "lightgrey",
        }}
      >
        {time}
      </Text>

      <LapView laps={laps} />

      <View style={styles.buttonsView}>
        <RoundedButton
          onPress={
            timerRunning
              ? () => {
                  setTimerRunning(false);
                }
              : () => {
                  setTimerRunning(true);
                }
          }
          text={
            timerRunning ? "Stop" : totalMilliseconds > 1 ? "Resume" : "Start"
          }
        />

        <RoundedButton
          onPress={
            timerRunning
              ? () => {
                  handleAddLap();
                }
              : () => {
                  handleResetTime();
                }
          }
          text={timerRunning ? "Lap" : "Reset"}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 60,
  },
  buttonsView: {
    flexDirection: "row",
  },
});
