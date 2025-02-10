import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
  screenOptions={{
    headerShown: false, // 🔹 Supprime tous les en-têtes
    title: "", // 🔹 Définit un titre vide par défaut
  }}
>
  <Stack.Screen name="SignIn" component={SignInScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>

  );
}
