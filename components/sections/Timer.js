import { StyleSheet, View, Text } from "react-native";

import RoundedButton from "../RoundedButton";
import { useState, useEffect, useRef, useContext } from "react";
import { Fragment } from "react";

import UtilButton from "../UtilButton";
import { Theme } from "../Theme";
import ChangeButtons from "../ChangeButtons";

export default function Timer() {
  const theme = useContext(Theme);
  // 'running' is true when the timer is running, and false when the timer has
  // stopped or is paused.
  const [running, setRunning] = useState(false);
  // Unlike 'running', 'timerBegun' becomes true when the user INITIATES the timer and will
  // stay true even if the user has paused the timer. It will only become
  // false when the user resets the timer.
  const [timerBegun, setTimerBegun] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const intervalId = useRef(0);
  // The initial set time before the user begins the timer
  const startTime = useRef("0:0:0");

  useEffect(() => {
    if (running && hour > -1) {
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        if (second - 1 < 0) {
          if (minute - 1 < 0) {
            setHour((hour) => hour - 1);
            setMinute((minute) => minute + 59);
          } else {
            setMinute((minute) => minute - 1);
          }
          setSecond((second) => second + 59);
        } else {
          setSecond((second) => second - 1);
        }
      }, 1000);
    } else if (hour < 0) {
      clearInterval(intervalId.current);
      setTimerBegun(false);
      setRunning(false);
      setHour(0);
      setMinute(0);
      setSecond((second) => second - 59);
    } else {
      clearInterval(intervalId.current);
    }
  }, [running, second, minute, hour]);

  const handleIncrement = (value) => {
    switch (value) {
      case "h":
        if (hour + 1 > 99) {
          setHour(0);
        } else {
          setHour(hour + 1);
        }
        break;
      case "m":
        if (minute + 1 > 59) {
          setMinute(0);
        } else {
          setMinute(minute + 1);
        }
        break;
      case "s":
        if (second + 1 > 59) {
          setSecond(0);
        } else {
          setSecond(second + 1);
        }
        break;
    }
  };

  const handleDecrement = (value) => {
    switch (value) {
      case "h":
        if (hour - 1 < 0) {
          setHour(99);
        } else {
          setHour(hour - 1);
        }
        break;
      case "m":
        if (minute - 1 < 0) {
          setMinute(59);
        } else {
          setMinute(minute - 1);
        }
        break;
      case "s":
        if (second - 1 < 0) {
          setSecond(59);
        } else {
          setSecond(second - 1);
        }
        break;
    }
  };

  return (
    <Fragment>
      <View>
        {!timerBegun && <ChangeButtons onPress={handleIncrement} text="+1" />}
        <Text
          style={{
            ...styles.timer,
            color: theme === "light" ? "#262626" : "lightgrey",
          }}
        >{`${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}:${
          second < 10 ? "0" : ""
        }${second}`}</Text>
        {!timerBegun && <ChangeButtons onPress={handleDecrement} text="-1" />}
      </View>
      <View style={styles.buttonsView}>
        <RoundedButton
          text={!running ? (timerBegun ? "Resume" : "Start") : "Pause"}
          onPress={
            !running
              ? () => {
                  setRunning(true);
                  if (!timerBegun) {
                    setTimerBegun(true);
                    startTime.current = `${hour}:${minute}:${second}`;
                  }
                }
              : () => setRunning(false)
          }
        />
        {timerBegun && (
          <RoundedButton
            text="Reset"
            onPress={
              timerBegun
                ? () => {
                    setTimerBegun(false);
                    setRunning(false);
                    setHour(Number(startTime.current.split(":")[0]));
                    setMinute(Number(startTime.current.split(":")[1]));
                    setSecond(Number(startTime.current.split(":")[2]));
                  }
                : null
            }
          />
        )}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  buttonsView: {
    flexDirection: "column",
    alignItems: "center",
  },
  timer: {
    fontSize: 60,
  },
});
