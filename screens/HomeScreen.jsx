import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
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

const images = [
  'https://i.pinimg.com/736x/60/e8/ea/60e8ea761af30a531b9e2b101c6c5bed.jpg',
  'https://i.pinimg.com/736x/60/6a/c8/606ac89609752764418966099b0f29ab.jpg',
  'https://i.pinimg.com/736x/59/62/10/5962104f925395e10adb27a20686babc.jpg',
  'https://i.pinimg.com/736x/99/8d/9a/998d9aa0c2b1bb41aa611fa01d0d8289.jpg',
  'https://i.pinimg.com/736x/2f/0b/39/2f0b39262c9aaebc0e154cec16321037.jpg',
];

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_HOUSES);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Available Houses</Text>
      <View style={styles.housesContainer}>
        {data.getHouses.map((house) => {
          const randomImage = images[Math.floor(Math.random() * images.length)];
          return (
            <View key={house.id} style={styles.houseCard}>
              <Image source={{ uri: randomImage }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.houseTitle}>{house.title}</Text>
                <Text style={styles.houseLocation}>{house.location}</Text>
                <Text style={styles.housePrice}>${house.price}</Text>
                <Text style={styles.houseType}>{house.houseType}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate('Details', { id: house.id, imageUrl: randomImage })}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddHouse')}>
        <Text style={styles.addButtonText}>Add Your House</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#00796b',
  },
  housesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  houseCard: {
    width: '30%',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardContent: {
    justifyContent: 'center',
  },
  houseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#00796b',
  },
  houseLocation: {
    fontSize: 14,
    color: '#004d40',
    marginBottom: 4,
  },
  housePrice: {
    fontSize: 14,
    color: '#004d40',
    marginBottom: 4,
  },
  houseType: {
    fontSize: 12,
    color: '#004d40',
    marginBottom: 8,
  },
  detailsButton: {
    backgroundColor: '#00796b',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#004d40',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#00796b',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});