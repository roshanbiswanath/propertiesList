import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_HOUSE_BY_ID = gql`
  query GetHouseById($id: ID!) {
    getHouseById(houseId: $id) {
      id
      title
      description
      location
      price
      houseType
      images
    }
  }
`;

export default function HouseDetails({ route, navigation }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_HOUSE_BY_ID, { variables: { id } });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const house = data.getHouseById;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{house.title}</Text>
      <Text>{house.description}</Text>
      <Text>{house.location}</Text>
      <Text>${house.price}</Text>
      <Text>{house.houseType}</Text>
      <Button title="Add New House" onPress={() => navigation.navigate('AddHouse')} />
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
});