import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const ADD_HOUSE = gql`
  mutation AddHouse($title: String!, $description: String!, $price: Float!, $location: String!, $houseType: String!, $images: [String!]!) {
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: 'https://i.pinimg.com/736x/59/62/10/5962104f925395e10adb27a20686babc.jpg' }} style={styles.image} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add New House</Text>
          <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
          <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} multiline />
          <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
          <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
          <TextInput placeholder="House Type" value={houseType} onChangeText={setHouseType} style={styles.input} />
          <Button title="Submit" onPress={handleSubmit} disabled={loading} />
          {error && <Text style={styles.error}>Error: {error.message}</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '40%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});