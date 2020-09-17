/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'chinook.db', createFromLocation: 1});

const App = () => {
  const [albums, setAlbums] = useState([]);
  const selectAlbums = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM albums', [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          setAlbums(temp);
        } else {
          alert('No user found');
        }
      });
    });
  };
  console.log(albums, 'Albums');
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <TouchableOpacity
          onPress={selectAlbums}
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: '#E8590A',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text>Fetch Albums</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
