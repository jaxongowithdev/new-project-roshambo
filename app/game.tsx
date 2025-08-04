import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import paper from '../assets/Paper.png';
import rock from '../assets/Rock.png';
import scissor from '../assets/Scissor.png';
import drawGif from '../assets/draw.gif';
import emptySlot from '../assets/empty.png';
import loseGif from '../assets/loss.gif';
import loserImg from '../assets/losser.jpg';
import winGif from '../assets/win.gif';
import winnerImg from '../assets/winner.jpeg';

export default function RPSGameScreen({ onChange, round, playerName }) {
  const options = [rock, paper, scissor];
  const [roundCount, setRoundCount] = useState(0);
  const [computerChoice, setComputerChoice] = useState(emptySlot);
  const [playerChoice, setPlayerChoice] = useState(emptySlot);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [resultText, setResultText] = useState("Let's Play!");
  const [showResult, setShowResult] = useState(false);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [resultImage, setResultImage] = useState(drawGif);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleBack = () => {
    onChange(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const playRound = async (playerSelection) => {
    const animationDelay = 800;
    setRoundCount(prev => prev + 1);
    setButtonsDisabled(true);

    if (roundCount < round) {
      for (let i = 0; i < 10; i++) {
        setPlayerChoice(options[i % 3]);
        setComputerChoice(options[(i + 1) % 3]);
        await sleep(50);
      }

      const computerSelection = Math.floor(Math.random() * 3);
      setComputerChoice(options[computerSelection]);
      setPlayerChoice(options[playerSelection]);

      if ((playerSelection === 0 && computerSelection === 2) ||
          (playerSelection === 1 && computerSelection === 0) ||
          (playerSelection === 2 && computerSelection === 1)) {
        setResultText('You Win!');
        setResultImage(winGif);
        setPlayerScore(prev => prev + 1);
      } else if (playerSelection === computerSelection) {
        setResultText('Draw');
        setResultImage(drawGif);
      } else {
        setResultText('You Lose!');
        setResultImage(loseGif);
        setComputerScore(prev => prev + 1);
      }

      setTimeout(() => setShowResult(true), animationDelay);
      setTimeout(() => {
        setComputerChoice(emptySlot);
        setPlayerChoice(emptySlot);
        setShowResult(false);
        setButtonsDisabled(false);
      }, 2500);

    } else {
      if (playerScore > computerScore) {
        setResultText('🎉 You Won the Game!');
        setResultImage(winnerImg);
      } else if (computerScore > playerScore) {
        setResultText('😞 You Lost the Game!');
        setResultImage(loserImg);
      } else {
        setResultText('🤝 It\'s a Tie!');
        setResultImage(drawGif);
      }
      setComputerScore(0);
      setPlayerScore(0);
      setRoundCount(0);
      setShowPlayAgain(true);
      setButtonsDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Round {roundCount + 1} / {round}</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>{playerName ? playerName : 'You' }: {playerScore}</Text>
        <Text style={styles.scoreLabel}>Computer: {computerScore}</Text>
      </View>

      <View style={styles.choicesContainer}>
        <Image source={playerChoice} style={styles.choiceImage} />
        <Image source={computerChoice} style={styles.choiceImage} />
      </View>

      {showResult && (
        <>
          <Text style={styles.resultText}>{resultText}</Text>
          <Image source={resultImage} style={styles.resultImage} />
        </>
      )}

      {!showPlayAgain ? (
        <View style={styles.choicesContainer}>
          <TouchableOpacity onPress={() => playRound(0)} disabled={buttonsDisabled}>
            <Image source={rock} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => playRound(1)} disabled={buttonsDisabled}>
            <Image source={paper} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => playRound(2)} disabled={buttonsDisabled}>
            <Image source={scissor} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={() => setShowPlayAgain(false)}
        >
          <Text style={styles.playAgainText}>🔁 Play Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#ff6b6b',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2c3e50',
  },
  scoreContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  scoreLabel: {
    fontSize: 18,
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 4,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 10,
  },
  choiceImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonImage: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
  },
  resultText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginTop: 10,
  },
  resultImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  playAgainButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
  },
  playAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
