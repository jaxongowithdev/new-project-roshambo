import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import pap from '../assets/Paper.png';
import rok from '../assets/Rock.png';
import sc from '../assets/Scissor.png';
import empty from '../assets/empty.png';
// import wintrop from '../assets/wintrop.png';
import { DataTable } from 'react-native-paper';
import { default as draw, default as tie } from '../assets/draw.gif';
import loss from '../assets/loss.gif';
import losser from '../assets/losser.jpg';
import win from '../assets/win.gif';
import winner from '../assets/winner.jpeg';
// import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
// import { Audio } from 'expo-av';
// import Sound from 'react-native-sound';

export default function Game(prop: any) {
  const opt = [rok, pap, sc];
  const [rndCnt, setrndCnt] = useState(0);

  const [computer, setcomp] = useState(empty);
  const [player, setplayer] = useState(empty);
  const [plyScr, setplyScr] = useState(0);
  const [compScr, setcompScr] = useState(0);
  const [Result, setResult] = useState("Let's Playsssssssssssssss");
  const [Showresult, setShowresult] = useState(false);
  const [again, setagain] = useState(false);
  const [resgif, setresgif] = useState(draw);
  const [butAct, setbutAct] = useState(false);


  const Sounds = {
  click:require('../assets/click.mp3'),
  cork:require('../assets/cork.mp3'),
  win:require('../assets/gameover.wav'),
  lose:require('../assets/failure.mp3'),
  draw:require('../assets/tie.wav'),
};

  const HandlePlaySound = async (snd: any)=>{
    // const sound = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     console.log('failed to load the sound', error);
    //     return;
    //   }
    //   // loaded successfully
    //   console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
    //   // Play the sound with an onEnd callback
    //   sound.play((success) => {
    //     if (success) {
    //       console.log('successfully finished playing');
    //     } else {
    //       console.log('playback failed due to audio decoding errors');
    //     }
    //   });
    // });
    // const track = {
    //   id: 'track-001',
    //   url: snd, // Remote file, live stream URL, or local file via require()
    //   title: 'My Track',
    //   artwork: 'https://example.com/artwork.jpg', // Remote image or local image via require()
    //   artist: 'Artist Name',
    // };
    // console.log('snd', track)
    // AudioPro.ambientPlay({
    //   url: 'https://rnap.dev/audio-soundhelix-song-1-tschurger.mp3', // Remote URL or local file via require()
    // });
    console.log('lcik')
    // SoundPlayer.playAsset(require('../assets/click.mp3'));
    // AudioPro.play(track);
    // const soundObj = new Audio.Sound();
    // try{
    //   let source = snd
    //   await soundObj.loadAsync(source);
    //   await soundObj.playAsync()
    //   .then(async playbackStatus =>{
    //     setTimeout(()=>{
    //       soundObj.unloadAsync()
    //     },playbackStatus.playableDurationMillis)
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })

    // }catch(err){
    //   console.log(err)
    // }
  };
 
  const BckToHome = () => {
    prop.onChange(false);
  };

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const change = async (choice: any) => {
    const tim = 800;
    setrndCnt(rndCnt + 1);
    setbutAct(true);
    if (prop.round !== rndCnt) {

      var n = 0;
      for (let i = 0; i < 10; i++) {
        if (n > opt.length) {
          n = 0;
        }
        setplayer(opt[n]);
        setcomp(opt[n - 1]);
        await sleep(50);
        n++;
      }
      var rndSel = Math.floor(Math.random() * opt.length) + 1;
      if (rndSel === 1) {
        setcomp(rok);
      } else if (rndSel === 2) {
        setcomp(pap);
      } else {
        setcomp(sc);
      }
      if (choice === 1) {
        setplayer(rok);
      } else if (choice === 2) {
        setplayer(pap);
      } else {
        setplayer(sc);
      }

      if (choice === 1) {
        if (rndSel === 3) {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.win);},tim
          );
          setplyScr(plyScr + 1);
          setResult('WIN');
          setresgif(win);

        } else if (rndSel === 2) {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.lose);}
            ,tim);
          setcompScr(compScr + 1);
          setResult('LOSE !');
          setresgif(loss);

        } else {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.draw);}
            ,tim);
          setResult('Draw !');
          setresgif(draw);
        }

      } else if (choice === 2) {
        if (rndSel === 3) {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.lose);}
            ,tim);
          setResult('LOSE !');
          setcompScr(compScr + 1);
          setresgif(loss);

        } else if (rndSel === 1) {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.win);}
            ,tim);
          setResult('WIN !');
          setplyScr(plyScr + 1);
          setresgif(win);

        } else {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.draw);}
            ,tim);

          setResult('Draw !');
          setresgif(draw);
        }
      } else {
        if (rndSel === 1) {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.lose);}
            ,tim);
          setcompScr(compScr + 1);
          setResult('LOSE !');
          setresgif(loss);

        } else if (rndSel == 2) {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.win);}
            ,tim);
          setplyScr(plyScr + 1);
          setResult('WIN !');
          setresgif(win);
        } else {
          setTimeout(
            ()=>{HandlePlaySound(Sounds.draw);}
            ,tim);
          setResult('Draw !');
          setresgif(draw);

        }
      }
      setTimeout(() => {
        setShowresult(true);
      }, 800);
      setTimeout(() => {
        setcomp(empty);
        setplayer(empty);
        setShowresult(false);
        setbutAct(false);
      }, 2500);
    } else {
      if(compScr > plyScr){
        HandlePlaySound(Sounds.lose);
        setResult('Loser');
        setresgif(losser);
      }
      if(compScr < plyScr){
        HandlePlaySound(Sounds.win);
        setResult('You Win');
        setresgif(winner);
      }
      if(compScr === plyScr){
        HandlePlaySound(Sounds.draw);
        setResult('Its Draw');
        setresgif(tie);
      }
      setcompScr(0);
      setplyScr(0);
      setrndCnt(0);
      setbutAct(false);
      setagain(true);
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.TitleCont}>
        <Text style={styles.titleName} >Rocks   Papers   Scissorw</Text>
        <TouchableOpacity onPress={()=>{BckToHome(); HandlePlaySound(Sounds.click);}} ><Text style={styles.backBtn}>Back</Text></TouchableOpacity>

      </View>
      <View style={styles.GameCont}>
        {Showresult ? <View style={styles.ResulCont}>
          <Text style={styles.Resul}>{Result}</Text>
          <Image style={styles.ResulImg} source={resgif} />
        </View> : <></>}
        <View style={styles.GameChoiceCont} >
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Computer</Text>
          <View style={styles.GameSelopt}>
            <Image style={styles.plySectedImage} source={computer} />
          </View>
        </View>
        <Text style={{ fontSize: 20, color: 'green', marginTop: 20 }}>Vs</Text>

        <View style={styles.GameChoiceCont}>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>You</Text>
          <View style={styles.GameSelopt}>
            <Image style={styles.plySectedImage} source={player} />
          </View>
        </View>
      </View>
      <View style={{ width: '85%' }}>
        <DataTable style={{ backgroundColor: 'azure', borderRadius: 20 }}>
          <DataTable.Header >
            <DataTable.Title><Text style={styles.tableTxt}>Player's</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableTxt}>Win</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableTxt}>Loss</Text></DataTable.Title>

          </DataTable.Header>
          <DataTable.Row style={{ textAlign: 'center' }}>
            <DataTable.Cell textStyle={{ color: 'chocolate', fontSize: 15 }}> Computer</DataTable.Cell>
            <DataTable.Cell textStyle={{ color: 'green', fontSize: 15, borderColor: 'green', width: '100%' }}>{compScr}</DataTable.Cell>
            <DataTable.Cell textStyle={{ color: 'red', fontSize: 15 }}>{plyScr}</DataTable.Cell>

          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell textStyle={{ color: 'chocolate', fontSize: 15 }}>{prop.playerName === '' ? 'YOU' : prop.playerName}</DataTable.Cell>
            <DataTable.Cell textStyle={{ color: 'green', fontSize: 15 }}>{plyScr}</DataTable.Cell>
            <DataTable.Cell textStyle={{ color: 'red', fontSize: 15 }}>{compScr}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>


      <Text style={styles.ply_title}>Your Choice's</Text>
      <View style={styles.playerCont}>
        <TouchableOpacity disabled={butAct} style={styles.playeropt} onPress={() => { change(1); HandlePlaySound(Sounds.cork);}} >
          <Image style={styles.plyImage} source={rok} />
        </TouchableOpacity>
        <TouchableOpacity disabled={butAct} style={styles.playeropt} onPress={() => { change(2); HandlePlaySound(Sounds.cork);}}>
          <Image style={styles.plyImage} source={pap} />
        </TouchableOpacity>
        <TouchableOpacity disabled={butAct} style={styles.playeropt} activeOpacity={0.9} onPress={() => { change(3); HandlePlaySound(Sounds.cork); }}>
          <Image style={styles.plyImage} source={sc} />
        </TouchableOpacity>
      </View>
      {
        again ?
          <View style={styles.playAgnCont}>
            <View style = {{position:'absolute',width:'100%',height:'100%',backgroundColor: '#222',opacity:0.8}} />
            <View style={styles.playAgnBox}>
              <Text style={{width:'100%',textAlign:'center',marginBottom:20, color: 'white',fontWeight:'bold', fontSize: 25,backgroundColor:'tomato' }}>ROUND OVER</Text>
              {/* <Image style={styles.tropyImg} source={wintrop} /> */}
              <Image style={styles.ResulImg} source={resgif} />
              <Text style={{marginVertical:20,color:'chocolate',fontSize:20,fontWeight:'bold'}}>{Result}</Text>

              <View style={{width:'100%',flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button title="Play Again" onPress={() => { setagain(false); HandlePlaySound(Sounds.click);}} />
                <Button title="Back" onPress={()=>{BckToHome(); HandlePlaySound(Sounds.click);}} />
              </View>
            </View>
          </View>
          : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TitleCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  backBtn: {
    backgroundColor: 'tomato',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: '#cc5200',
    borderWidth: 2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  titleName: {
    color: 'royalblue',
    fontSize: 18,
    padding: 10,
    margin: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  GameCont: {
    flexDirection: 'row',
    width: '95%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  ResulCont: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',


  },
  Resul: {
    zIndex: 1,
    width: '100%',
    color: '#C3B1E1',
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  ResulImg: {
    width: 100,
    height: 100,

  },

  GameChoiceCont: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 25,

  },
  tableTxt: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 15,
  },
  GameSelopt: {
    width: 120,
    height: 120,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'azure',
    padding: 10,
  },
  plySectedImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    margin: 5,
  },
  ply_title: {
    fontSize: 15,
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 1,

  },
  playerCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'smokewhite',
    borderColor: 'lightgray',
    borderWidth: 5,


  },
  playeropt: {
    width: 90,
    height: 90,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: '#24a0ed',

    borderWidth: 5,
    backgroundColor: '#80bfff',
    padding: 7,
  },
  plyImage: {
    width: '100%',
    height: '100%',
  },
  playAgnCont: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  playAgnBox: {
    width:'90%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    zIndex:100,
  },
  tropyImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'lightgray',
    borderWidth: 2,
    marginVertical: 20,
  },
});

//npx stallion publish-bundle --upload-path=mini_game/roshambo/firsttest --platform=android --release-note="change text"
