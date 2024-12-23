import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_HOUSES = gql`
  query GetHouses {
    getHouses {
      id
      title
      location
      price
      houseType
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_HOUSES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Houses</Text>
      {data.getHouses.map((house) => (
        <View key={house.id} style={styles.houseCard}>
          <Text>{house.title}</Text>
          <Text>{house.location}</Text>
          <Text>${house.price}</Text>
          <Text>{house.houseType}</Text>
          <Button title="View Details" onPress={() => navigation.navigate('Details', { id: house.id })} />
        </View>
      ))}
      <Button title="Add New House" onPress={() => navigation.navigate('AddHouse')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  houseCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});