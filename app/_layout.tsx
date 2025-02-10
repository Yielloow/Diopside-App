import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 🔹 Désactive l'en-tête globalement
      }}
    >
      <Stack.Screen name="index" options={{ title: "Accueil" }} />
      <Stack.Screen name="screens/ShopScreen" options={{ title: "Ma Boutique" }} />
      <Stack.Screen name="screens/DiscussScreen" options={{ title: "Discussion" }} />
      <Stack.Screen name="screens/FiltersScreen" options={{ title: "Mes Filtres" }} />
      <Stack.Screen name="screens/DressScreen" options={{ title: "Mon Aperçu" }} />
      <Stack.Screen name="screens/ProfilScreen" options={{ title: "Mon Armoire" }} />
    </Stack>
  );
}
