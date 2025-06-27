import { ReactNode, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import DateTimePicker, { CalendarComponents, DateType, CalendarDay, useDefaultStyles } from 'react-native-ui-datepicker';
import Feather from '@expo/vector-icons/Feather';

const components: CalendarComponents = {
  IconPrev: (
    <Feather name="chevron-left" size={22} className="text-foreground" />
  ),
  IconNext: (
    <Feather name="chevron-right" size={22} className="text-foreground" />
  ),
  // Day: (day: CalendarDay) => <Day day={day} />,
};

type Props = {
  birthday: Date;
  setBirthday: (birthday: Date) => void;
  onNext: () => void;
};

export default function OnboardingStepTwo({ birthday, setBirthday, onNext }: Props) {
  // const [age, setAge] = useState('');
  let today = new Date();
  const defaultStyles = useDefaultStyles();
  const [date, setDate] = useState<DateType>();

  return (
    <View style={styles.contentContainer}>
        <Text style={styles.heading}>When is your birthday?</Text>
        <DateTimePicker
          components={components}
          mode="single"
          date={birthday}
          // onChange={({ date }) =>  setDate(date)}
          onChange={({ date }) =>  setBirthday(new Date(date.toLocaleString()))}
          maxDate={today}
          // navigationPosition='around'
          // containerHeight={350}
          // weekdaysHeight={50}
          hideWeekdays={true}
          showOutsideDays={true} // show dates from previous/next month
          styles={{
            // ...defaultStyles,
            today: { borderColor: 'grey', borderWidth: 1 }, // Add a border to today's date
            selected: { backgroundColor: 'grey' }, // Highlight the selected day
            selected_label: { color: 'white' }, // Highlight the selected day label
            day: { color: 'green', borderRadius: 10 },
            disabled_label: { color: 'grey' },
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 18, marginBottom: 8 },
  input: {
    width: '100%',
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    marginBottom: 16,
    padding: 12,
    fontSize: 18,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4630EB',
  }
});