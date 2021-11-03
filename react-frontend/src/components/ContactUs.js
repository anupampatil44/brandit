import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { TextField, Button, Typography } from "@mui/material";
import{ init } from 'emailjs-com';
init("user_YOXfdBFlphnO1ZMQDmHmq");
export default function CountactUs() {
  const form = useRef();
  function sendEmail(e){
    e.preventDefault();

    emailjs.sendForm('service_w0wozau', 'template_x2biy3r', form.current, 'user_YOXfdBFlphnO1ZMQDmHmq')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      form.current.reset()
  };
  return (
    <div id="contact">
      <Typography
        variant="h4"
        component="div"
        align="center"
        color="#black"
        gutterBottom={true}
        style={{ marginTop: 20 }}
      >
        Get In Touch with Us
      </Typography>

      <form ref={form} onSubmit={sendEmail}>
        <TextField
          sx={{ mb: 1 }}
          fullWidth
          label="Name"
          type="text"
          name="name"
        />

        <TextField
          sx={{ mb: 1 }}
          fullWidth
          label="Email"
          type="email"
          name="email"
        />

        <TextField
          sx={{ mb: 1 }}
          fullWidth
          label="Subject"
          type="text"
          name="subject"
        />
        <TextField
          sx={{ mb: 1 }}
          rows={4}
          multiline
          fullWidth
          label="Message"
          type="text"
          name="message"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
