import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import data from './data.json';

export default function index() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {data.map(({bgColor, color, category}, index) => (
        <TouchableOpacity
          key={String(index)}
          onPress={() => {}}
          activeOpacity={0.9}
          style={[styles.cardContainer, {backgroundColor: bgColor}]}>
          <View style={[styles.card]}>
            <Text>{category}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
