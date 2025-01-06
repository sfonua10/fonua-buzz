import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { birthdayData } from '@/assets/data/birthdayData';
import { Person } from '@/assets/data/types';

type Props = {
  month: number;
  year: number;
};

export function MonthView({ month, year }: Props) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  const getBirthdaysForDay = (day: number) => {
    return birthdayData.filter((person: Person) => {
      const date = new Date(person.birthDate);
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      return localDate.getMonth() === month && localDate.getDate() === day;
    });
  };

  return (
    <ThemedView style={styles.monthContainer}>
      <ThemedView style={styles.weekDayHeader}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <ThemedText key={day} style={styles.weekDayText}>
            {day}
          </ThemedText>
        ))}
      </ThemedView>

      <ThemedView style={styles.daysContainer}>
        {emptyDays.map((_, index) => (
          <ThemedView key={`empty-${index}`} style={styles.dayCell} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const birthdaysOnThisDay = getBirthdaysForDay(day);
          const hasBirthdays = birthdaysOnThisDay.length > 0;

          return (
            <ThemedView
              key={`day-${day}`}
              style={[
                styles.dayCell,
                hasBirthdays && styles.dayWithBirthday,
              ]}
            >
              <ThemedText style={styles.dayNumber}>{day}</ThemedText>
              {hasBirthdays && (
                <ThemedView style={styles.birthdayIndicator}>
                  <ThemedText style={styles.birthdayName} numberOfLines={1}>
                    {birthdaysOnThisDay.map(b => b.name).join(', ')}
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  monthContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  weekDayHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    width: '100%',
  },
  weekDayText: {
    width: `${Math.floor(100/7)}%`,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCell: {
    width: `${Math.floor(100/7)}%`,
    height: 70,
    alignItems: 'center',
    paddingTop: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E5E5E5',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  dayWithBirthday: {
    backgroundColor: 'transparent',
  },
  birthdayIndicator: {
    backgroundColor: '#FFE5E5',
    borderRadius: 4,
    padding: 2,
    width: '80%',
    position: 'absolute',
    bottom: 8,
  },
  birthdayName: {
    fontSize: 10,
    textAlign: 'center',
    color: '#FF4444',
  },
}); 