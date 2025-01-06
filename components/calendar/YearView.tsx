import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

type Props = {
  onMonthSelect: (monthIndex: number) => void;
};

const { width } = Dimensions.get('window');
const GRID_PADDING = 16;
const GRID_SPACING = 8;
const MONTH_WIDTH = (width - (GRID_PADDING * 2) - (GRID_SPACING * 2)) / 3;

export function YearView({ onMonthSelect }: Props) {
  const getDaysInMonth = (month: number) => {
    return new Date(2025, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number) => {
    return new Date(2025, month, 1).getDay();
  };

  return (
    <ThemedView style={styles.yearContainer}>
      {MONTHS.map((month, monthIndex) => (
        <TouchableOpacity
          key={month}
          style={styles.monthGridItem}
          onPress={() => onMonthSelect(monthIndex)}
        >
          <ThemedView style={styles.monthGridContent}>
            <ThemedText style={styles.monthGridHeader}>{month}</ThemedText>
            <ThemedView style={styles.miniDaysGrid}>
              {Array(getFirstDayOfMonth(monthIndex)).fill(null).map((_, i) => (
                <ThemedText key={`empty-${i}`} style={styles.miniDay}> </ThemedText>
              ))}
              {Array(getDaysInMonth(monthIndex)).fill(null).map((_, i) => (
                <ThemedText key={`day-${i}`} style={styles.miniDay}>
                  {i + 1}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  yearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GRID_PADDING,
    gap: GRID_SPACING,
  },
  monthGridItem: {
    width: MONTH_WIDTH,
    aspectRatio: 0.85,
  },
  monthGridContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  monthGridHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 1,
    textAlign: 'center',
  },
  miniDaysGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
    marginTop: -1,
  },
  miniDay: {
    width: '14%',
    fontSize: 7,
    textAlign: 'center',
    color: '#666',
    marginVertical: 0,
  },
}); 