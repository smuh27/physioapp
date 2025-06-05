import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { observer } from '@legendapp/state/react';
import { clients$ as _clients$, muscles$ as _muscles$, clientIsOnboarded, getClientByAuthUserId, updateClient } from '../../utils/supabaseClient';
import { Tables } from '../../utils/database.types';
import MuscleList from '../components/MuscleList';
import { Session } from '@supabase/supabase-js';
import { signOut } from '../../utils/supabaseClient';
import NewClientOnboarding from '../components/NewClientOnboarding';
import { showAlert } from '../../utils/alert';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type HomePageProps = {
  userId: string;
  session: Session;
};

const HomePage: React.FC<HomePageProps> = observer(({ session }) => {
  const [loading, setLoading] = useState(true)
  const [clientId, setClientId] = useState('')
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  // const user = _clients$.get() as Tables<'clients'>[];
  const [onboarded, setOnboarded] = useState(false);
  const muscles = _muscles$.get();
  
  // re-render on session updates
  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  useEffect(() => {
    checkOnboarded();
  }, [session]);
  
  async function checkOnboarded() {
    try {
      setLoading(true);
      if (session?.user?.id) {
        let { data: isOnboarded, error } = await clientIsOnboarded(session.user.id);
        if (error) {
          setOnboarded(false);
          throw error;
        }
        setOnboarded(isOnboarded);
      }
    } catch (error) {
      showAlert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { client, error, status } = await getClientByAuthUserId(session?.user.id)
      if (error && status !== 406) {
        throw error
      }

      if (client) {
        setClientId(client.id)
        setName(client.name)
        setUserName(client.name)
      }
    } catch (error) {
      showAlert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ name, }: { name: string }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')
      if (!clientId) throw new Error('No user found for the session')

      const updates = {
        id: clientId,
        user_id: session?.user.id,
        name: name,
        email: session?.user.email,
        // todo: other fields
        updated_at: new Date().toISOString(),
      }

      let error = await updateClient(updates)

      if (error) {
        throw error
      }

      // success, update fields
      setUserName(name)

    } catch (error) {
      showAlert('Update Profile', error.message || 'An error occurred while updating your profile.')
    } finally {
      setLoading(false)
    }
  }

  /* TODO: this is all temporary logic, use expo-router instead to route from sign-in/up -> onboarding/home  */
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        { !onboarded ? <NewClientOnboarding session={session}  /> : 
          <View>
            <TouchableOpacity style={styles.button} onPress={signOut}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View> 
        }
        <Text style={styles.heading}>Welcome, {userName}</Text>
        <MuscleList muscles={muscles ? Object.values(muscles) : []} />
      </SafeAreaView>
      
      {/* temporary: user functionality */}
      <View >
        <TouchableOpacity style={styles.button} onPress={() => updateProfile({ name })}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={session?.user?.email}
          aria-disabled
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={name}
          onChangeText={setName}
        />
      </View>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
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
  button: {
    backgroundColor: '#4630EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
