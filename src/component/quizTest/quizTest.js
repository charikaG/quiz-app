import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./quizTest.css";

const QuizTest = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  let [quizTest, setQuizTest] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [count, setCount] = useState(0);
let [isDisabled , setDisabled] = useState(false);

  useEffect(() => {
    let quizValues = [];
    quizValues = JSON.parse(localStorage.getItem("quizData"));
    quizValues.forEach((res) => {
      if (res.permalink === currentPath) {
        setQuizTest(res.questions);
      }
    });
  }, []);

  const handleAnswers = (selectedAnswer, questionId, inputType) => {
    const objectToUpdate = answers.find((obj) =>
      obj.hasOwnProperty(questionId)
    );

    if (objectToUpdate && Array.isArray(objectToUpdate[questionId])) {
      if (inputType === "single") {
        objectToUpdate[questionId] = [];
        objectToUpdate[questionId].push(selectedAnswer);
      } else {
        objectToUpdate[questionId].push(selectedAnswer);
      }
    } else {
      const newObject = { [questionId]: [selectedAnswer] };
      answers.push(newObject);
    }

    setAnswers(answers);
  };

  function submitAnswers() {
    let correctAnswers = [];
    quizTest.forEach((res, i) => {
      correctAnswers.push({ [i]: res.correctAnswers });
    });
    const submittedAnswers = [...answers];
    for (let i = 0; i < submittedAnswers.length; i++) {
      const submittedAnswer = submittedAnswers[i];
      const questionId = Object.keys(submittedAnswer)[0];
      const selectedChoices = submittedAnswer[questionId];
      const correctAnswer = correctAnswers[i][questionId];
    
      if (selectedChoices && correctAnswer && Array.isArray(selectedChoices) && Array.isArray(correctAnswer)) {
        if (selectedChoices.length === correctAnswer.length && selectedChoices.every(choice => correctAnswer.includes(choice))) {
          count++;
        }
      }
    }
    setCount(count);
    setDisabled(true);
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          {quizTest.map((res, i) => (
            <div>
              <h2 key={res.permalink} className="questions">
                Q{i + 1} : {res.question}
              </h2>
              <Form>
                <div
                  key={`default-${
                    res.type === "single" ? "radio" : "checkbox"
                  }`}
                  className="mb-3"
                >
                  {res.answers.map((val, j) => (
                    <Form.Check // prettier-ignore
                      type={res.type === "single" ? "radio" : "checkbox"}
                      id={`default-${res.type}`}
                      label={val}
                      name={`group${i}`}
                      value={j}
                      onChange={() => handleAnswers(j, i, res.type)}
                    />
                  ))}
                </div>
              </Form>
            </div>
          ))}
          <Button variant="primary" type="button" onClick={submitAnswers} disabled={isDisabled}>
            Submit Answers
          </Button>
          <h4>Score : {count ? count : 0} </h4>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
};

export default QuizTest;
