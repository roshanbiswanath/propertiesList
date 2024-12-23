import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
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
  const { id, imageUrl } = route.params;
  const { loading, error, data } = useQuery(GET_HOUSE_BY_ID, { variables: { id } });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const house = data.getHouseById;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{house.title}</Text>
      <Text style={styles.description}>{house.description}</Text>
      <Text style={styles.location}>{house.location}</Text>
      <Text style={styles.price}>${house.price}</Text>
      <Text style={styles.houseType}>{house.houseType}</Text>
      <Button title="Add Your House" onPress={() => navigation.navigate('AddHouse')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  houseType: {
    fontSize: 16,
    marginBottom: 16,
  },
});