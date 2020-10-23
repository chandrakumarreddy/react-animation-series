import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Transition, Transitioning} from 'react-native-reanimated';

import data from './data.json';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function Animation2() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  return (
    <Transitioning.View
      transition={transition}
      style={styles.container}
      ref={ref}>
      <StatusBar hidden />
      {data.map(({bgColor, color, category, subCategories}, index) => (
        <TouchableOpacity
          key={String(index)}
          onPress={() => {
            ref.current.animateNextTransition();
            setCurrentIndex((prevIndex) =>
              prevIndex === index ? null : index,
            );
          }}
          activeOpacity={0.9}
          style={[styles.cardContainer, {backgroundColor: bgColor}]}>
          <View style={[styles.card]}>
            <Text style={[styles.heading, {color}]}>{category}</Text>
            {currentIndex === index && (
              <View style={styles.subCategory}>
                {subCategories.map((_category, _index) => (
                  <Text key={String(_index)} style={[{color, fontSize: 16}]}>
                    {_category}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </Transitioning.View>
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
  heading: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20 * 1.5,
    letterSpacing: -2,
    textTransform: 'uppercase',
  },
  subCategory: {
    marginTop: 16,
  },
});
