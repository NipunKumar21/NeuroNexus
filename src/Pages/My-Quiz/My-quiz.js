import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Container } from "@mui/material";
import "./MyQuizStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteQuiz, toggleActive } from "../../Redux/Actions/Actions";
import Switch from "@mui/material/Switch";

const MyQuiz = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const handleDelete = (id) => {
    setDeleteID(id);
    setModal(true);
  };
  const deleteYes = () => {
    dispatch(deleteQuiz(deleteID));
    setModal(false);
  };

  const toggleHandler = (id) => {
    dispatch(toggleActive(id));
  };
  const Quiz = useSelector((state) => state.reducer.quiz);

  return (
    <Layout>
      <Container>
        <div className="head">
          <h1 style={{color: "white"}}>My Quizes</h1>
          <Button
            component={Link}
            to={"/newquiz"}
            variant="outlined"
            color="error"
            sx={{  bgcolor: "rgb(206, 78, 78)", color: "white"  }}
          >
            Create New Quiz
          </Button>
        </div>
        {modal === true ? (
          <div className="deleteouter">
            <div className="deleteModal">
              <h2>Do you really want to delete this..?</h2>
              <div className="deletebtn">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    ":hover": { bgcolor: "rgb(206, 78, 78)", color: "white" },
                    height: "30px",
                    margin: "10px 10px 0px 10px",
                  }}
                  onClick={() => deleteYes()}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    ":hover": { bgcolor: "rgb(206, 78, 78)", color: "white" },
                    height: "30px",
                    margin: "10px 10px 0px 10px",
                  }}
                  onClick={() => setModal(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="all-quiz-container">
            {Quiz.length === 0 ? (
              <p style={{color: "white", height: "150px" }}>
                Currently There Are no quizes!
              </p>
            ) : (
              <div className="table">
                <table>
                  <thead>
                    <tr className="table-sno tableHead">
                      <th>Quiz No</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Created on</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {Quiz.map((el, i) => (
                    <tbody key={i}>
                      <tr className="table-sno">
                        <td>{i + 1}</td>
                        <td className="Title">{el.title}</td>
                        <td>
                          <div className="switch">
                            {el.isActive ? (
                              <span className="active">Active</span>
                            ) : (
                              <span className="active">Inactive</span>
                            )}
                            <Switch
                              defaultChecked
                              color="success"
                              onClick={() => toggleHandler(el.id)}
                            />
                          </div>
                        </td>
                        <td className="time">
                          {el.createdOn.getDate()}/{el.createdOn.getMonth()}/
                          {el.createdOn.getFullYear()}
                          <br />
                          {el.createdOn.getHours()}:{el.createdOn.getMinutes()}
                        </td>
                        <td>
                          <Button
                            className="deletebtn"
                            onClick={() => handleDelete(el.id)}
                          >
                            <DeleteOutlineOutlinedIcon
                              sx={{ color: "darkred" }}
                            />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            )}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default MyQuiz;
