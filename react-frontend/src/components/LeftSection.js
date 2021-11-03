import { Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export default function LeftSection() {
  return (
    <div>
      <Typography
        variant="h3"
        component="div"
        color="black"
        gutterBottom={true}
        style={{ marginTop: 20, fontSize: 44 }}
      >
        A dynamic branding solution capable of creating the ideal branding
        statement.
      </Typography>

      <Typography color="#808080" gutterBottom={true} style={{ marginTop: 20 }}>
        Looking for a platform to enhance or boost the existing message of your
        business? BrandIt, will help you to promote your business and offer you
        a competitive advantage. Simply answer a few questions pertaining to
        your brand or product and our ML system will create an ideal branding
        statement, catered specifically for you!
      </Typography>

      <NavLink
        to="/questionnaire"
        style={{ textDecoration: "none", color: "white" }}
      >
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{ marginTop: 20 }}
        >
          Get Started
        </Button>
      </NavLink>
    </div>
  );
}
