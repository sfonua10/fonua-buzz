import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MonthView } from '@/components/calendar/MonthView';
import { YearView } from '@/components/calendar/YearView';
import { MOCK_BIRTHDAYS } from '@/constants/mockData';
import { Ionicons } from '@expo/vector-icons';

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

type ViewMode = 'year' | 'month';

export default function HomeScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('year');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const year = 2025;

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setViewMode('month');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        {viewMode === 'month' && (
          <ThemedView style={styles.header}>
            <ThemedView style={styles.yearHeader}>
              <TouchableOpacity 
                onPress={() => setViewMode('year')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Ionicons name="chevron-back" size={24} color="#007AFF" />
                <ThemedText style={styles.yearText}>{year}</ThemedText>
              </TouchableOpacity>
              <ThemedText style={styles.monthText}>
                {MONTHS[selectedMonth]}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}

        {viewMode === 'year' ? (
          <YearView onMonthSelect={handleMonthSelect} />
        ) : (
          <MonthView 
            month={selectedMonth}
            year={year}
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearText: {
    fontSize: 17,
    color: '#007AFF',
    marginLeft: 4,
  },
  monthText: {
    paddingTop: 8,
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
