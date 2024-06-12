import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";

const quizData = [
  {
    question: "What is the first step in recycling?",
    options: ["Collection", "Separation", "Processing", "Selling"],
    correctOption: "Collection",
  },
  {
    question: "Which of the following materials can be recycled?",
    options: ["Plastic", "Glass", "Paper", "All of the above"],
    correctOption: "All of the above",
  },
  {
    question: "Recycling one ton of paper saves how many trees?",
    options: ["5", "10", "17", "20"],
    correctOption: "17",
  },
  {
    question: "What symbol is commonly used to indicate recyclable materials?",
    options: ["Heart", "Circle", "Triangle", "Square"],
    correctOption: "Triangle",
  },
  {
    question: "Which of the following cannot be recycled?",
    options: ["Plastic bottles", "Glass jars", "Styrofoam", "Cardboard"],
    correctOption: "Styrofoam",
  },
  {
    question: "What is composting?",
    options: [
      "Burning waste",
      "Burying waste",
      "Turning organic waste into soil",
      "Throwing waste in water",
    ],
    correctOption: "Turning organic waste into soil",
  },
  {
    question: "Recycling helps to reduce...",
    options: [
      "Air pollution",
      "Water pollution",
      "Landfill space",
      "All of the above",
    ],
    correctOption: "All of the above",
  },
  {
    question: "What does the recycling symbol with a number inside mean?",
    options: [
      "Type of material",
      "Recycling center location",
      "Brand name",
      "None of the above",
    ],
    correctOption: "Type of material",
  },
  {
    question: "Which material takes the longest to decompose?",
    options: ["Paper", "Glass", "Plastic", "Organic waste"],
    correctOption: "Glass",
  },
  {
    question: "Why is it important to rinse containers before recycling?",
    options: [
      "To reduce odors",
      "To prevent contamination",
      "To save space",
      "All of the above",
    ],
    correctOption: "To prevent contamination",
  },
];

const RecyclingQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const handleAnswerPress = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
      Alert.alert("Correct!", "Good job, you got it right!");
    } else {
      Alert.alert(
        "Incorrect",
        `The correct answer was: ${currentQuestion.correctOption}`
      );
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            You scored {score} out of {quizData.length}
          </Text>
          <Text style={styles.highScoreText}>
            High Score: {highScore} out of {quizData.length}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRestartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {quizData[currentQuestionIndex].question}
          </Text>
          {quizData[currentQuestionIndex].options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => handleAnswerPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  highScoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RecyclingQuiz;
