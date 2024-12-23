import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import HouseDetails from './screens/HouseDetails';
import AddHouseForm from './screens/AddHouseForm';
import UserListings from './screens/UserListings';
import BookingScreen from './screens/BookingScreen';
import LoginScreen from './screens/LoginScreen';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Register from './screens/Register';

const Stack = createStackNavigator();

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    setToken(token);
    
    setIsAuthenticated(!!token);
  };
  useEffect(() => {
    
    checkAuth();
    
  }, [token]);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={token ? "Home" : "Login"}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={HouseDetails} />
          <Stack.Screen name="AddHouse" component={AddHouseForm} />
          <Stack.Screen name="UserListings" component={UserListings} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
