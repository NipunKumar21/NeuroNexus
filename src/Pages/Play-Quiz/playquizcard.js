import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Result from "./Result";
import { getAnswer } from "../../Redux/Actions/Actions";
import sound from "../../sound/Sound.wav";
import option from "../../sound/Option.mp3";
import Layout from "../../components/Layout/Layout";
import "./PlayQuizCardStyle.css";

const PlayQuizCard = () => {
  const [count, setcount] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [finalAnswer, setfinalAnswer] = useState({});
  const [disable, setDisable] = useState(true);
  const quiz = useSelector((state) => state.reducer.playQuiz).questions;
  const title = useSelector((state) => state.reducer.title);

  const name = useSelector((state) => state.reducer.name);
  const dispatch = useDispatch();

  const question = quiz[count].question;
  const answers = quiz[count].answers;

  const nextQuestionHandler = () => {
    dispatch(getAnswer(finalAnswer));
    setDisable(true);
    if (count >= quiz.length - 1) {
      new Audio(sound).play();
      setshowModal(true);
      setcount((prev) => prev);
    } else {
      setcount((prev) => prev + 1);
      new Audio(option).play();
    }
  };

  const onclickHandler = (el) => {
    new Audio(option).play();
    getAnswerHandler(el.answer, el.correct, el.id);
    setDisable(false);
  };

  const getAnswerHandler = (answer, correct, id) => {
    const Answer = {
      answer: answer,
      isCorrect: correct,
      id: id,
    };
    setfinalAnswer(Answer);
  };

  return (
    <Layout>
      <Container>
        <div className="Contain">
          <div>
            {showModal ? (
              <Result name={name} />
            ) : (
              <div className="QuizCard-Container">
                <div className="QuizCard-Title">
                  <h1>{title}</h1>
                </div>
                <h2>
                  Q.{count + 1} {question}
                </h2>
                <div>
                  {answers.map((el, i) => (
                    <div
                      className="QuizCard-Option"
                      onClick={() => onclickHandler(el)}
                      style={{
                        background: `${
                          finalAnswer.id === el.id ? "green" : "white"
                        }`,
                      }}
                      key={i}
                    >
                      <p>{el.answer}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <div>
                    <h3>
                      Question {count + 1}/{quiz.length}
                    </h3>
                  </div>
                  <div className="next-question">
                    {disable ? (
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          ":hover": {
                            bgcolor: "rgb(206, 78, 78)",
                            color: "white",
                          },
                        }}
                      >
                        Next Question
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          ":hover": {
                            bgcolor: "rgb(206, 78, 78)",
                            color: "white",
                          },
                        }}
                        onClick={nextQuestionHandler}
                      >
                        Next Question
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PlayQuizCard;
