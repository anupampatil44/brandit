import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import List from "@mui/material/List";
const Procedure = () => {
  return (
    <div className="list" style={{ marginBottom: "15vh", marginTop: "5vh" }}>
      <List>
        <Typography variant="h3" children="So," />
        <ListItem>
          <Typography
            variant="h3"
            children="How do we pick the perfect slogan for you?"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowForwardOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="h5"
              color="#808080"
              children="Answer a few basic questions about what you want to accomplish with your slogan."
            />
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <ArrowForwardOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="h5"
              color="#808080"
              children="Consider what you want to communicate about your product or business."
            />
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <ArrowForwardOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="h5"
              color="#808080"
              children="keep your message clear and concise."
            />
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <ArrowForwardOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="h5"
              color="#808080"
              children="And, Voila! Our ML model will generate the voice of your brand!"
            />
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default Procedure;
