import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar, StyleSheet, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

function Circle({onPress, animatedValue}) {
  const circleContainerBg = animatedValue.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 1],
    outputRange: ['gold', 'gold', 'gold', '#444', '#444'],
  });
  const circleBg = animatedValue.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 1],
    outputRange: ['#444', '#444', '#444', 'gold', 'gold'],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {backgroundColor: circleContainerBg},
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {perspective: 400},
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0%', '50%', '0%'],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.circle,
              styles.circleButton,
              {backgroundColor: circleBg},
            ]}>
            <AntDesign name="arrowright" size={28} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const App = () => {
  let currentIndex = 0;
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const onPress = () => {
    currentIndex = currentIndex === 1 ? 0 : 1;
    Animated.timing(animatedValue, {
      toValue: currentIndex,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden style="auto" />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    backgroundColor: 'gold',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: '#444',
    borderRadius: 50,
  },
  circleButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
