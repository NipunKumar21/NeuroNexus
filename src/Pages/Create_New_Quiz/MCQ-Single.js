import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./MCQSingleStyle.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuiz } from "../../Redux/Actions/Actions";

const MCQSingle = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();
  const CorrectAnswerRef = useRef();

  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [answerDone, setAnswerDone] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const addedTimeout = setTimeout(() => {
      if (added) {
        setAdded(false);
      }
    }, 2000);

    const answerDoneTimeout = setTimeout(() => {
      if (answerDone) {
        setAnswerDone(false);
      }
    }, 2000);

    return () => {
      clearTimeout(addedTimeout);
      clearTimeout(answerDoneTimeout);
    };
  }, [added, answerDone]);
  //this func use for add options
  const addOptionHandler = (event) => {
    event.preventDefault();
    if (answerRef.current.value === "") {
      return;
    }
    if (answers.length >= 4) {
      return;
    } else {
      const Answers = {
        answer: answerRef.current.value,
        correct: CorrectAnswerRef.current.checked,
        id: Math.random(),
      };
      setAnswers((prev) => [...prev, Answers]);
    }
    answerRef.current.value = "";
    CorrectAnswerRef.current.checked = false;
  };
  //this func use for add Question
  const addQuestionHandler = (e) => {
    e.preventDefault();
    if (questionRef.current.value === "") {
      return alert("Enter Question!");
    }
    if (questionRef.current.length < 10) {
      return alert("Enter atleast 10 characters in the Question!");
    }
    if (answers.length === 0) {
      return alert("Enter Options!");
    }
    if (answers.length >= 2) {
      const Question = {
        question: questionRef.current.value,
        answers: answers,
        id: count,
      };
      setCount(count + 1);
      setAdded(true);
      setQuestion((prev) => [...prev, Question]);
      setAnswers([]);
      questionRef.current.value = "";
    } else {
      setAnswerDone(true);
    }
  };
  //this func is use for submit task
  const onSaveHandler = (event) => {
    event.preventDefault();

    if (titleRef.current.value === "" || descriptionRef.current.value === "") {
      return alert("Enter Title and Description");
    }
    if (question.length === 0) {
      return alert("Add Question!");
    }

    const Quiz = {
      description: descriptionRef.current.value,
      questions: question,
      title: titleRef.current.value,
      id: Math.random(),
      createdOn: new Date(),
      isActive: true,
    };

    dispatch(addQuiz(Quiz));
    setCount(1);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    navigate("/PlayQuiz");
  };
  //this func use for delete a options
  const deleteHandler = (id) => {
    const newAnswers = answers.filter((el) => el.id !== id);
    setAnswers(newAnswers);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  //this func use for checkbox label change in green
  const ChangeStyle = () => {
    return isChecked ? { color: "green" } : { color: "black" };
  };

  return (
    <Layout>
      <Container>
        <div className="heading">
          <h1>Create New Quiz</h1>
        </div>
        <div className="quizForm">
          <form action="" onSubmit={onSaveHandler}>
            <div className="upper">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="QuizForm-Title"
                maxLength={30}
                minLength={10}
                required
                ref={titleRef}
              />
              <input
                type="text"
                className="description"
                placeholder="Add Description"
                required
                ref={descriptionRef}
              />
            </div>
            <div className="QA">
              <label htmlFor="question">Question {count}</label>
              <input
                type="text"
                className="question"
                placeholder="Enter You Question"
                maxLength={200}
                required
                ref={questionRef}
              />
              {added && <p className="QA-P-G">Your question is added!</p>}
              {answerDone && <p className="QA-P-R">Add atleast 2 Options!</p>}
            </div>
            <div className="answerSection">
              <input
                type="text"
                className="answer"
                placeholder="Enter Options"
                ref={answerRef}
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                }}
              />
              <div className="checkBox">
                <input
                  type="checkbox"
                  id="check"
                  name="correct"
                  className="CheckBox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  ref={CorrectAnswerRef}
                />
                <p className="checkboxP" style={ChangeStyle()}>
                  Correct Answer
                </p>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={addOptionHandler}
                  sx={{
                    height: "40px",
                    width: "160px",
                    marginLeft: "15px",
                    "@media(max-width:600px)": {
                      width: "100px",
                      margin: "2px",
                      padding: "2px",
                    },
                    ":hover": {
                      bgcolor: "rgb(206, 78, 78)",
                      color: "white",
                    },
                  }}
                >
                  <ControlPointIcon
                    sx={{
                      height: "30px",
                      marginRight: "8px",
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                  Add option
                </Button>
              </div>
            </div>
            <div className="viewAnswer">
              {answers.map((el, i) => {
                return (
                  <div
                    className="Enter-Option"
                    key={i}
                    style={
                      el.correct
                        ? { background: "#32a84e" }
                        : { background: "#D1D1D1" }
                    }
                  >
                    <p style={{ overflowWrap: "break-word", width: "100px" }}>
                      {el.answer}
                    </p>
                    <Button
                      size="small"
                      onClick={() => deleteHandler(el.id)}
                      sx={{ height: "50%", color: "black" }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="questionBtn">
              <Button
                variant="outlined"
                color="error"
                sx={{
                  ":hover": { bgcolor: "rgb(206, 78, 78)", color: "white" },
                }}
                onClick={addQuestionHandler}
              >
                {" "}
                <ControlPointIcon sx={{ height: "30px", marginRight: "8px" }} />
                Add Question
              </Button>
            </div>
            <hr />
            <Button
              onClick={onSaveHandler}
              variant="outlined"
              color="error"
              sx={{
                ":hover": { bgcolor: "rgb(206, 78, 78)", color: "white" },
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default MCQSingle;
