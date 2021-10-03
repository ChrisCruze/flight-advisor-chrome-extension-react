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
import axios from "axios";
import GaugeChart from "react-gauge-chart";

// import Image from "material-ui-image";

const theme = createTheme();

const ngrok_url = "https://1798-34-83-40-166.ngrok.io/";
const selectFieldDict = {
  origin: { options: [{ label: "MEM", value: "MEM" }], label: "Origin", id: "origin" },
  destination: { options: [{ label: "IAH", value: "IAH" }], label: "Destination", id: "destination" },
  airline: { options: [{ label: "UA", value: "UA" }], label: "Airline", id: "airline" }
};

//https://www.npmjs.com/package/react-gauge-chart
const SpeedometerChart = ({ percent }) => {
  return (
    <GaugeChart
      id="gauge-chart5"
      textColor="black"
      nrOfLevels={420}
      arcsLength={[0.3, 0.5, 0.2]}
      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
      percent={percent || 0}
      arcPadding={0.02}
    />
  );
};

const getFlightDelay = ({ setResponse, url }) => {
  const options = {
    url: url,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }
  };
  axios(options).then(response => {
    const responseResult = { data: response.data, status: response.status };
    console.log({ responseResult });
    setResponse(responseResult);
  });
};

const createURLFromForm = ({ formData }) => {
  const origin = formData.origin.value;
  const destination = formData.destination.value;
  const airline = formData.airline.value;
  const url = `${ngrok_url}/delay_frequency/origin=${origin}&destination=${destination}&airline=${airline}`;
  return url;
};
const App = () => {
  const [formData, setFormdata] = useState({
    origin: { value: "", label: "" },
    destination: { value: "", label: "" },
    airline: { value: "", label: "" }
  });
  const [response, setResponse] = useState({ data: undefined, response: "" });

  const handleSubmit = event => {
    event.preventDefault();
    console.log({ formData });
    const url = createURLFromForm({ formData });
    getFlightDelay({ setResponse, url });
  };
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
            {/* {response.data || "Flight Advisor"} */}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SpeedometerChart percent={response.data} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
