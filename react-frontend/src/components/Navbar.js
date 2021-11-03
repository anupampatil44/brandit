import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1 }}
            color="black"
          >
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              Brand-It
            </NavLink>
          </Typography>
          <Stack spacing={2} direction="row">
            <NavLink
              to="/questionnaire"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="primary" variant="contained">
                Get a Slogan
              </Button>
            </NavLink>

            <Link activeClass="active" to="contact" smooth={true}>
              <Button color="primary" variant="contained">
                Contact Us
              </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
