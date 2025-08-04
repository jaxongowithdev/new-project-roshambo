import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import intro from '../assets/intro.gif';

export default function Welcome(prop: any) {
  const [Name, setName] = useState('');
  const [rounds, setRounds] = useState(1);

  const handleChange = () => {
    prop.onChange(true, rounds, Name);
  };

  const Sounds = {
    intro: require('../assets/fight.wav'),
    click: require('../assets/click.mp3'),
  };

  const HandlePlaySound = async (snd: any) => {
    // handle sound if needed
  };

  useEffect(() => {
    HandlePlaySound(Sounds.intro);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>

      <View style={styles.gifContainer}>
        <Image style={styles.gif} source={intro} />
      </View>

      <Text style={styles.subTitle}>Let's Play</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={Name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Number of Rounds</Text>

      <View style={styles.roundControl}>
        <TouchableOpacity
          onPress={() => {
            if (rounds > 1) {
              setRounds(rounds - 1);
              HandlePlaySound(Sounds.click);
            }
          }}>
          <Text style={styles.roundButton}>−</Text>
        </TouchableOpacity>

        <Text style={styles.roundText}>{rounds}</Text>

        <TouchableOpacity
          onPress={() => {
            if (rounds < 10) {
              setRounds(rounds + 1);
              HandlePlaySound(Sounds.click);
            } else {
              alert('Maximum round is reached');
            }
          }}>
          <Text style={styles.roundButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => {
          handleChange();
          HandlePlaySound(Sounds.click);
        }}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a47a3',
    backgroundColor: '#a3c9f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  gifContainer: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#8ecae6',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3d405b',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  roundControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  roundButton: {
    fontSize: 30,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#ddefff',
    borderRadius: 25,
    marginHorizontal: 15,
    borderColor: '#7ea1ff',
    borderWidth: 2,
    color: '#2a60ff',
    fontWeight: 'bold',
  },
  roundText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },
  playButton: {
    backgroundColor: '#4a47a3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
