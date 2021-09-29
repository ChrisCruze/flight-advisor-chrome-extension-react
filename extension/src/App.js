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
import Autocomplete from "@mui/material/Autocomplete";

// import Image from "material-ui-image";

const theme = createTheme();

const selectFieldDict = {
  origin: { options: [{ label: "IAD", value: "IAD" }], label: "Origin", id: "origin" },
  destination: { options: [{ label: "IAD", value: "IAD" }], label: "Destination", id: "destination" },
  airline: { options: [{ label: "IAD", value: "IAD" }], label: "Airline", id: "airline" }
};

const App = () => {
  const [url, setUrl] = useState("");
  const [formData, setFormdata] = useState({
    origin: { value: "", label: "" },
    destination: { value: "", label: "" },
    airline: { value: "", label: "" }
  });
  const handleSubmit = event => {
    event.preventDefault();
    console.log({ formData });
  };

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, tabs => {
        const url = tabs[0].url;
        setUrl(url);
      });
  }, []);

  const TypeAheadSelect = ({ options, label, id }) => {
    return (
      <Autocomplete
        disablePortal
        value={formData[id].label}
        onChange={(event, newValue) => {
          const clonedData = { ...formData };
          clonedData[id] = newValue || { value: "", label: "" };
          setFormdata(clonedData);
        }}
        id={id}
        options={options}
        renderInput={params => <TextField {...params} label={label} />}
      />
    );
  };

  const AirLineSelect = () => {
    return <TypeAheadSelect {...selectFieldDict["airline"]} />;
  };

  const OriginSelect = () => {
    return <TypeAheadSelect {...selectFieldDict["origin"]} />;
  };

  const DestinationSelect = () => {
    return <TypeAheadSelect {...selectFieldDict["destination"]} />;
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
                <AirLineSelect />
              </Grid>
              <Grid item xs={12} sm={6}>
                <OriginSelect />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DestinationSelect />
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
};

export default App;
