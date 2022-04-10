import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Profile = ({picture, nama, email, prodi, onTap, onDelete}) => {
  return (
    <View style={styles.profile}>
      <TouchableOpacity onPress={onTap}>
        <Image source={picture} style={styles.avatar} />
      </TouchableOpacity>
      <View style={styles.textProfile}>
        <Text style={styles.nameProfile}>{nama}</Text>
        <Text>{email}</Text>
        <Text>{prodi}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textProfile: {
    paddingHorizontal: 10,
  },
  nameProfile: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
