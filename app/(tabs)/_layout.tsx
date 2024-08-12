// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';


// Navigation
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' } // Hide the default tab bar
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="trips" options={{ headerShown: false }} />
      <Tabs.Screen name="calendar" options = {{ headerShown: false }} />
      <Tabs.Screen name='travelChat' options= {{ headerShown: false}} />
    </Tabs>
  );
}
