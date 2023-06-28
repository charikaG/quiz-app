import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoggedIn = () => {
  const [title, setTitle] = useState("");
  const [quizData , setListOfQuiz] = useState([]);
  const [questions, setQuestions] = useState([
    {
      question: "",
      type: "single",
      answers: ["", "", "", ""],
      correctAnswers: [],
    },
  ]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (event, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    const { checked } = event.target;

    if (checked) {
      updatedQuestions[questionIndex].correctAnswers.push(answerIndex);
    } else {
      const index =
        updatedQuestions[questionIndex].correctAnswers.indexOf(answerIndex);
      if (index !== -1) {
        updatedQuestions[questionIndex].correctAnswers.splice(index, 1);
      }
    }

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 10) {
      let lastAddedQuestion = questions[questions.length - 1];
      let isEmpty =
        lastAddedQuestion.question &&
        lastAddedQuestion.type &&
        lastAddedQuestion.correctAnswers.length > 0 &&
        lastAddedQuestion.answers.every((answer) => answer !== "");
      if (!isEmpty) {
        alert("Please enter the question and its details");
      } else {
        setQuestions([
          ...questions,
          {
            question: "",
            type: "single",
            answers: ["", "", "", ""],
            correctAnswers: [],
          },
        ]);
      }
    }
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const toggleQuestionType = (index) => {
    const updatedQuestions = [...questions];
    const currentType = updatedQuestions[index].type;
    updatedQuestions[index].type =
      currentType === "single" ? "multiple" : "single";
    setQuestions(updatedQuestions);
  };

  const renderQuestionTypeSelect = (index) => {
    const currentType = questions[index].type;

    return (
      <Form.Select
        value={currentType}
        onChange={() => toggleQuestionType(index)}
      >
        <option value="single">Single Correct Answer</option>
        <option value="multiple">Select All Correct Answers</option>
      </Form.Select>
    );
  };

  const renderAnswers = (questionIndex) => {
    const currentAnswers = questions[questionIndex].answers;

    return currentAnswers.map((answer, answerIndex) => (
      <div>
        <div key={answerIndex}>
          <input
            type={
              questions[questionIndex].type === "single" ? "radio" : "checkbox"
            }
            checked={questions[questionIndex].correctAnswers.includes(
              answerIndex
            )}
            onChange={(event) =>
              handleCorrectAnswerChange(event, questionIndex, answerIndex)
            }
          />{" "}
          <input
            type="text"
            value={answer}
            onChange={(event) =>
              handleAnswerChange(event, questionIndex, answerIndex)
            }
          />
        </div>
        <br />
      </div>
    ));
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <div key={index}>
        <div>
          <input
            type="text"
            value={question.question}
            onChange={(event) => handleQuestionChange(event, index)}
          />{" "}
          <Button variant="primary" onClick={() => removeQuestion(index)}>
            Remove Question
          </Button>
        </div>
        <br />
        <div>
          <label>{renderQuestionTypeSelect(index)}</label>
        </div>
        <br />
        <div>
          <label>Answers:</label>
          {renderAnswers(index)}
        </div>
        <br />
      </div>
    ));
  };

  /**
   * To generate the permalink for the quiz
   */
  const generatePermalink = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let permalink = "";
    for (let i = 0; i < 6; i++) {
      permalink += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return permalink;
  };
 
  /**
   *  Save the quiz data to local storage
   *  Perform any other actions or redirects after submitting the quiz
   */
  const handlePublish = () => {
    let isEmpty = true;
    for(let lastAddedQuestion of questions) {
      isEmpty =
      lastAddedQuestion.question &&
      lastAddedQuestion.type &&
      lastAddedQuestion.correctAnswers.length > 0 &&
      lastAddedQuestion.answers.every((answer) => answer !== "");
      if(!isEmpty) {
        break;
      } else {
        continue
      }
    }
    if (title && isEmpty) {
      const permalink = generatePermalink();
      let quiz = {
        title,
        questions,
        permalink,
      };
      setTimeout(() => {

          quizData.push(quiz)
        setListOfQuiz(quizData)
        localStorage.setItem("quizData", JSON.stringify(quizData));
        alert("Successfully submitted the details");
        setQuestions([{
          question: "",
          type: "single",
          answers: ["", "", "", ""],
          correctAnswers: [],
        },]);
        setTitle('');
      } , 0)
    
    } else {
      alert(
        "Please enter the Quiz title or check if all the questions are filled"
      );
    }
  };

  return (
    // <Container fluid >
    //   <Row>
    //     <Col sm={3}></Col>
    //     <Col sm={6}>
    <Form>
      <div>
        <label>
          Quiz Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
      </div>
      <div>
        <h2>Questions:</h2>
        {renderQuestions()}
      </div>
      <Button variant="primary" type="button" onClick={addQuestion}>
        Add Question
      </Button>{" "}
      <Button variant="primary" type="button" onClick={handlePublish}>
        Submit Quiz
      </Button>
    </Form>
    // </Col>
    // <Col sm={3}></Col>
    // </Row>
    // </Container>
  );
};

export default LoggedIn;
