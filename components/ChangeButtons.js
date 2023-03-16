import { StyleSheet, View } from "react-native";
import UtilButton from "./UtilButton";

export default function ChangeButtons({ onPress, text }) {
  return (
    <View style={styles.incrementButtonsView}>
      <UtilButton onPress={() => onPress("h")} text={text} />
      <UtilButton onPress={() => onPress("m")} text={text} />
      <UtilButton onPress={() => onPress("s")} text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  incrementButtonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
