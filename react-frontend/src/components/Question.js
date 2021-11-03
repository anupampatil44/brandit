import { Button, Stack, TextField, Typography } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import "../App.css";

const Question = ({ qno, question, handleDone, inner, answer, setAnswer }) => {
  return (
    <div style={{ margin: "20vh", overflow: "hidden" }}>
      <Stack direction="column" spacing={2} className={inner}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">{qno}</Typography>
          <ArrowForwardOutlinedIcon />
          <Typography variant="h5" style={{ paddingBottom: "8vh" }}>
            {question}
          </Typography>
        </Stack>

        <TextField
          id="standard-basic"
          placeholder="Your answer here.."
          variant="standard"
          style={{ width: "60vw" }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          autoComplete={"off"}
          minRows={1}
          multiline={true}
          required={true}
          autoFocus={true}
        />
        <Button
          variant="contained"
          onClick={handleDone}
          style={{
            backgroundColor: "#385A64",
            color: "#ffffff",
            width: "4vw",
            height: "7vh",
          }}
        >
          DONE
        </Button>
      </Stack>
    </div>
  );
};

export default Question;
