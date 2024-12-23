import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql, useMutation } from '@apollo/client';
import { log } from 'console';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      
      
      await AsyncStorage.setItem('token', data.login.token);
      console.log(data);
      
      navigation.replace('Home');
    } catch (e) {
      Alert.alert('Login Failed', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} disabled={loading} />
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});