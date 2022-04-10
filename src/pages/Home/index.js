import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Profile from '../../components/Profile';
import picture from '../../image/avatar.jpeg';
import axios from 'axios';

const Home = () => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    prodi: '',
  });
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState('Simpan');
  const [selectedUser, setSelectedUser] = useState({});

  const submit = async () => {
    if (button === 'Simpan') {
      await axios.post('http://192.168.0.4:4000/users', form);
      setForm({
        ...form,
        nama: '',
        email: '',
        prodi: '',
      });
    }

    if (button === 'Ubah') {
      await axios.put(`http://192.168.0.4:4000/users/${selectedUser.id}`, form);
      setForm({
        ...form,
        nama: '',
        email: '',
        prodi: '',
      });
      setSelectedUser({});
      setButton('Simpan');
    }

    getData();
  };

  const getData = async () => {
    const response = await axios.get('http://192.168.0.4:4000/users');
    setUsers(response?.data);
  };

  const onDelete = async id => {
    await axios.delete(`http://192.168.0.4:4000/users/${id}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>CRUD Menggunakan API JSON Server</Text>
      <TextInput
        placeholder="Nama lengkap"
        style={styles.input}
        value={form.nama}
        onChangeText={value => setForm({...form, nama: value})}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={value => setForm({...form, email: value})}
      />
      <TextInput
        placeholder="Prodi"
        style={styles.input}
        value={form.prodi}
        onChangeText={value => setForm({...form, prodi: value})}
      />
      <Button title={button} onPress={submit} />
      <View style={styles.line} />
      {users.length > 0 &&
        users.map((value, index) => (
          <Profile
            key={index}
            onTap={() => {
              setForm({
                ...form,
                nama: value.nama,
                email: value.email,
                prodi: value.prodi,
              });
              setSelectedUser({
                id: value.id,
                nama: value.nama,
                email: value.email,
                prodi: value.prodi,
              });
              setButton('Ubah');
            }}
            picture={picture}
            nama={value?.nama}
            email={value?.email}
            prodi={value?.prodi}
            onDelete={() => onDelete(value.id)}
          />
        ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  line: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 25,
    paddingHorizontal: 18,
  },
});
