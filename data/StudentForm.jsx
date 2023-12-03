import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const StudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [course, setCourse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const addStudent = async () => {
    const newStudent = {
      ID: uuidv4(),
      firstName,
      lastName,
      course,
      username,
      password,
    };

    try {
      const existingStudents = JSON.parse(await AsyncStorage.getItem('students')) || [];
      const updatedStudents = [...existingStudents, newStudent];
      await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));

      // Clear input fields
      setFirstName('');
      setLastName('');
      setCourse('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Add Student" onPress={addStudent} />
      <Button title="Clear" onPress={clearAsyncStorage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default StudentForm;