import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons 
                    name="settings-outline" 
                    size={24} 
                    color={pressed ? '#666' : '#000'} 
                    style={{ marginRight: 16 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
