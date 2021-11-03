import React, { useState } from "react";
import Loader from "./Loader";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import List from "@mui/material/List";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Result({ result, setResult, text }) {
  const [retry, setRetry] = useState(false);
  const handleRetry = () => {
    setRetry(true);
    axios
      .post("https://apiforbrandit.in/generateTaglines", {
        num_of_suggestions: 5,
        context: text,
      })
      .then((res) => {
        setResult(res.data);
        setRetry(false);
      });
  };

  return (
    <div>
      {retry ? (
        <Loader result={[]} />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ padding: "15vh" }}
        >
          <Grid>
            <List>
              <ListItem>
                <Typography
                  variant="h4"
                  children="Here's the top 5 slogans that we curated for you!"
                  gutterBottom={true}
                />
              </ListItem>
              {result.map((item, i) => {
                return (
                  <div key={i}>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowForwardOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="h5"
                          color="#808080"
                          children={item}
                        />
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </Grid>
          <Stack direction="row" spacing={5}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              style={{ marginTop: 20 }}
              onClick={handleRetry}
            >
              Retry
            </Button>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                style={{ marginTop: 20 }}
              >
                Go To Home
              </Button>
            </Link>
          </Stack>
        </Grid>
      )}
    </div>
  );
}
