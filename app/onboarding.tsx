import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import OnboardingStepOne from './components/onboarding/onboardingStep1';
import OnboardingStepTwo from './components/onboarding/onboardingStep2';
import OnboardingStepThree from './components/onboarding/onboardingStep3';
import { getClientByAuthUserId, updateClient } from './utils/supabaseClient';
import { useSession } from './utils/sessionContext';
import { showAlert } from './utils/alert';
import { router } from 'expo-router';
import { getAge } from './utils/helpers';

const Onboarding = () => {
  const session = useSession();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState<Date>();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    setStep(prevStep => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const completeOnboarding = async () => {
    setName('test'); setBirthday(new Date('2000-08-16')); setHeight('175'); setWeight('150'); setGender(gender);
    showAlert('Onboarding complete', `Name: ${name},\nBirthday: ${birthday},\nHeight: ${height},\nWeight: ${weight},\nGender: ${gender}`)

    // todo: update clients table using supabase update query
    const { client, error, status } = await getClientByAuthUserId(session?.user?.id);
    if (client){
      client.name = name;
      client.birthday = birthday;
      client.height = height;
      client.weight = weight;
      client.gender = gender;

      let error = await updateClient(client);
      if (error){
        showAlert('Error', error.message);
      }
      else{
        showAlert(`Onboarding complete! name=${name}, gender=${gender}, age=${getAge(birthday)}, height=${height}, weight=${weight}`);
        router.replace('/tabs');
      }
    }
    else if (error){
      showAlert('Error', error.message);
    }
  }

  const renderStepIndicator = () => {
    // const { client, } = await getClientByAuthUserId(session?.user?.id);
    // if (client){
    //   showAlert(`Client found: ${client.name}!`);
    // }

    const indicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View key={i} style={styles.stepContainer}>
          <View style={[styles.stepIndicator, i <= step && styles.activeStep]}>
            <Text style={[styles.stepText, i <= step && styles.activeStepText]}>{i}</Text>
          </View>
          {i < totalSteps && <View style={[styles.line, i < step && styles.activeLine]} />}
        </View>
      );
    }
    return <View style={styles.indicatorContainer}>{indicators}</View>;
  };

  return (
    <View style={styles.container}>
      {renderStepIndicator()}

      <View style={styles.contentContainer}>
        {step === 1 && <OnboardingStepOne name={name} setName={setName} gender={gender} setGender={setGender} onNext={null} />}
        {step === 2 && <OnboardingStepTwo birthday={birthday} setBirthday={setBirthday} onNext={null} />}
        {step === 3 && <OnboardingStepThree height={height} setHeight={setHeight} weight={weight} setWeight={setWeight} onNext={null} />}
      </View>

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.backButton]}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < totalSteps ? (
          <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={completeOnboarding} style={[styles.button, styles.nextButton]}>
            <Text style={styles.nextButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
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
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4630EB',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E7E7E7',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    borderColor: 'pink',
    backgroundColor: 'pink',
  },
  stepText: {
    color: '#E7E7E7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeStepText: {
    color: 'white',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#E7E7E7',
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: 'pink',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: '#E7E7E7',
    marginRight: 10,
  },
  backButtonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: 'pink',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Onboarding;