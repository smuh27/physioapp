import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { showAlert } from '../utils/alert';
import { signUpWithEmail, signInWithEmail, resetPassword } from '../utils/supabaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setLoading(true);
    
    const { session, error } = await signUpWithEmail(email, password);

    if (error) showAlert('Sign up', error.message)
    else if (!session) showAlert('Sign up', 'Please check your inbox for email verification!')
    setLoading(false);
  }

  async function signIn() {
    setLoading(true);
    
    const error = await signInWithEmail(email, password);
    
    if (error) showAlert('Login Failed', error.message);
    setLoading(false);
  }

  // TODO: implement forgot password component functionality
  async function forgotPassword() {
    setLoading(true);
    
    const error = await resetPassword(email);
    
    if (error) showAlert('Forgot Password', error.message);
    else showAlert('Forgot Password', 'Please check your inbox for password reset instructions!');
    
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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

export default LoginPage;
