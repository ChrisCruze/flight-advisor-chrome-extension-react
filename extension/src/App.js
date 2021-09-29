import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import logo from "./logo.svg";
import "./App.css";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Image from "material-ui-image";

const TypeHeadSelect = () => {
  var options = [{ id: 1, name: "John" }, { id: 2, name: "Miles" }, { id: 3, name: "Charles" }, { id: 4, name: "Herbie" }];
  return (
    <Typeahead
      id={"ad"}
      onChange={selected => {
        console.log({ selected });
        // Handle selections...
      }}
      options={options}
    />
  );
};
const theme = createTheme();
function SignUp() {
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password")
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white" }}>
            <Avatar alt="Remy Sharp" src="/images/suit_case_logo.ico" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Flight Advisor
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TypeHeadSelect />
              </Grid> */}
              <Grid item xs={12}>
                <TextField required fullWidth id="airline" label="Airline" name="airline" autoComplete="airline" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="fname" name="origin" required fullWidth id="oring" label="Origin" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="destination" label="Destination" name="destination" autoComplete="lname" />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const App = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, tabs => {
        const url = tabs[0].url;
        setUrl(url);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          URL
          {url}
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default SignUp;
