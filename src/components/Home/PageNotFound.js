import React from "react";
import img from "../../images/PageNotFound.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <img src={img} alt="404 Page Not Found" style={{ height: "70vh" }} />
        <Button
          component={Link}
          to={"/"}
          variant="outlined"
          color="error"
          sx={{ ":hover": { bgcolor: "rgb(206, 78, 78)", color: "white" } }}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
