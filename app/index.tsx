import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './game';
import Welcome from './welcme';


export default function HomeScreen() {
   const [play, setplay] = useState(false);
  const [rounds, setrounds] = useState(1);
  const [plyName, setplyName] = useState('YOU');

  const handlechange = (plystats: any, rnd: any, plyerName: any) => {
    setplay(plystats);
    setrounds(rnd);
    setplyName(plyerName);
  };
  const Gamehandlechange = (plystats: any) => {
    setplay(plystats);
  };

  useEffect(() => {
  }, []);
  return (
    <View style={styles.container}>
      {/* <WebView source={{ uri: `${process.env.API_URL}` }} style={{ flex: 1 }} /> */}
      {play ? (
        <Game round={rounds} playerName={plyName} onChange={Gamehandlechange} />
      ) : (
        <Welcome onChange={handlechange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'lightblue',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
