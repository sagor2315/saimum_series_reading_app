import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function CacheButton() {
  const [forceRefresh, setForceRefresh] = useState(false);

  return (
    <View>
      <Text>Always fetch latest data</Text>
      <Switch value={forceRefresh} onValueChange={setForceRefresh} />
    </View>
  );
}
