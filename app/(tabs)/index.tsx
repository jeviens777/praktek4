import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#ffc0cb');
  const [emoji, setEmoji] = useState('🌷');
  const [lastIndex, setLastIndex] = useState(-1);

  const fallAnim = new Animated.Value(-100);

  // DATA WARNA + EMOJI
  const colors = [
    { color: '#ffc0cb', emoji: '🌷' }, // pink
    { color: '#ffff99', emoji: '🌻' }, // kuning
    { color: '#ff4d4d', emoji: '🌹' }, // merah
    { color: '#66cc66', emoji: '🌵' }, // hijau
    { color: '#a0522d', emoji: '🍂' }, // coklat
  ];

  // ANIMASI HUJAN
  const animateRain = () => {
    fallAnim.setValue(-100);

    Animated.timing(fallAnim, {
      toValue: height,
      duration: 1300,
      useNativeDriver: true,
    }).start();
  };

  // 🔊 SOUND
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/images/cute.mp3') // ⚠️ sesuaikan path
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Sound error:', error);
    }
  }; 

  // GANTI WARNA
  const changeColor = () => {
    let index = Math.floor(Math.random() * colors.length);

    if (index === lastIndex) {
      index = (index + 1) % colors.length;
    }

    setLastIndex(index);

    const selected = colors[index];

    setBgColor(selected.color);
    setEmoji(selected.emoji);

    animateRain();
    playSound(); // 🔥 SOUND DIPANGGIL DI SINI
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>

      {/* EMOJI HUJAN */}
      {[...Array(15)].map((_, i) => {
  const delay = i * 150; // beda waktu jatuh

  const animatedValue = new Animated.Value(-100);

  Animated.timing(animatedValue, {
    toValue: height,
    duration: 1000,
    delay: delay, 
    useNativeDriver: true,
  }).start();

  return (
    <Animated.Text
      key={i}
      style={[
        styles.emoji,
        {
          left: Math.random() * width,
          transform: [{ translateY: animatedValue }],
          fontSize: 50 + Math.random() * 50,
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
})}

      {/* GREETING */}
      <Text style={styles.text}>
        Holaa, {name || 'Love'}!
      </Text>

      {/* INPUT */}
      <TextInput
        placeholder="Ketik nama kamu disini..."
        placeholderTextColor="#2f2a2a" 
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* COUNTER */}
      <View style={styles.row}>

  {/* TOMBOL MINUS */}
  <TouchableOpacity onPress={() => count > 0 && setCount(count - 1)}>
    <View style={[styles.heart, { backgroundColor: '#99c9e3' }]}>
      <View style={[styles.circleLeft, { backgroundColor: '#99c9e3' }]} />
      <View style={[styles.circleRight, { backgroundColor: '#99c9e3' }]} />
      <Text style={styles.heartText}>-</Text>
    </View>
  </TouchableOpacity>

  <Text style={styles.count}>{count}</Text>

  {/* TOMBOL PLUS */}
  <TouchableOpacity onPress={() => setCount(count + 1)}>
    <View style={[styles.heart, { backgroundColor: '#99c9e3' }]}>
      <View style={[styles.circleLeft, { backgroundColor: '#99c9e3' }]} />
      <View style={[styles.circleRight, { backgroundColor: '#99c9e3' }]} />
      <Text style={styles.heartText}>+</Text>
    </View>
  </TouchableOpacity>

</View>
      {/* BUTTON */}
      <TouchableOpacity style={styles.colorBtn} onPress={changeColor}>
        <Text style={styles.btnText}>Ganti Warna</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
heart: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  transform: [{ rotate: '-45deg' }],
  marginHorizontal: 15,
},

circleLeft: {
  position: 'absolute',
  width: 40,
  height: 40,
  borderRadius: 20,
  top: -20,
  left: 0,
},

circleRight: {
  position: 'absolute',
  width: 40,
  height: 40,
  borderRadius: 20,
  top: 0,
  left: 20,
},

heartText: {
  transform: [{ rotate: '45deg' }],
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emoji: {
    position: 'absolute',
    top: 0,
    fontSize: 50,
  },

  text: {
    fontSize: 25,
    marginBottom: 230,
  },

  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#99c9e3',
    borderRadius: 20,
    padding: 10,
    marginBottom: 60,
    color: 'black', // warna teks user
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  count: {
    fontSize: 50,
    marginHorizontal: 30,
  },

  btn: {
  width: 60,
  height: 60,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  transform: [{ rotate: '-45deg' }],
  marginHorizontal: 15,
},

  colorBtn: {
    backgroundColor: '#88afd9',
    padding: 14,
    borderRadius: 20,
  },

  btnText: {
    color: '#fff',
    fontSize: 19,
  },
});