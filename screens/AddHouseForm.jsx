import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { launchImageLibrary } from 'react-native-image-picker';

const ADD_HOUSE = gql`
  mutation AddHouse($title: String!, $description: String, $price: Float!, $location: String!, $houseType: String!, $images: [String!]!) {
    addHouse(title: $title, description: $description, price: $price, location: $location, houseType: $houseType, images: $images) {
      id
      title
    }
  }
`;

export default function AddHouseForm({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [houseType, setHouseType] = useState('');
  const [images, setImages] = useState([]);
  const [addHouse, { data, loading, error }] = useMutation(ADD_HOUSE);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.assets) {
        setImages(response.assets.map(asset => asset.uri));
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await addHouse({
        variables: {
          title,
          description,
          price: parseFloat(price),
          location,
          houseType,
          images,
        },
      });
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New House</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput placeholder="House Type" value={houseType} onChangeText={setHouseType} style={styles.input} />
      <Button title="Pick Images" onPress={handleImagePicker} />
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </View>
      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});