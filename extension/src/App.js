import React, { useEffect, useState, Fragment } from "react";
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
import LoadingButton from "@mui/lab/LoadingButton";
import Loader from "react-loader-spinner";
import { AirportOptions, AirlineOptions } from "./Data.js";
import Switch from "@mui/material/Switch";

import { dark } from "@mui/material/styles/createPalette";

// import Image from "material-ui-image";
const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});
const theme = createTheme();
const airline_options = AirlineOptions;
const airport_options = AirportOptions;
const ngrok_url = "https://5d3b-35-239-124-170.ngrok.io"; //"https://cc6f-34-83-40-166.ngrok.io";

const selectFieldDict = {
  origin: { options: airport_options, label: "Origin", id: "origin" },
  destination: { options: airport_options, label: "Destination", id: "destination" },
  airline: { options: airline_options, label: "Airline", id: "airline" }
};

//https://www.npmjs.com/package/react-gauge-chart
const SpeedometerChart = ({ percent, textColor }) => {
  return (
    <GaugeChart
      id="gauge-chart5"
      textColor={textColor}
      nrOfLevels={420}
      arcsLength={[0.3, 0.5, 0.2]}
      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
      percent={percent || 0}
      arcPadding={0.02}
    />
  );
};

const getFlightDelay = ({ setResponse, url, setLoading }) => {
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
    setLoading(false);
  });
};

const createURLFromForm = ({ formData }) => {
  const origin = formData.origin.value;
  const destination = formData.destination.value;
  const airline = formData.airline.value;
  const url = `${ngrok_url}/delay_frequency/origin=${origin}&destination=${destination}&airline=${airline}`;
  console.log({ url });
  return url;
};
const LoadingScreen = () => {
  return (
    <Grid container spacing={2} direction="column" alignItems="center" justify="center">
      <Grid item xs={12}>
        <Loader
          type={"ThreeDots" || "TailSpin"}
          color="#00BFFF"
          height={100}
          width={175}
          // timeout={3000} //3 secs
        />
      </Grid>
    </Grid>
  );
};

const ChartScreen = ({ response, themeToggle }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SpeedometerChart percent={response.data} textColor={themeToggle ? "white" : "black"} />
      </Grid>
    </Grid>
  );
};
const LoadingGraph = ({ loading, response, themeToggle }) => {
  return <Fragment>{loading ? <LoadingScreen /> : <ChartScreen response={response} themeToggle={themeToggle} />}</Fragment>;
};
const App = () => {
  const [formData, setFormdata] = useState({
    origin: { value: "", label: "" },
    destination: { value: "", label: "" },
    airline: { value: "", label: "" }
  });
  const [response, setResponse] = useState({ data: undefined, response: "" });
  const [loading, setLoading] = useState(false);
  const [themeToggle, setThemeToggle] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    console.log({ formData });
    setLoading(true);
    const url = createURLFromForm({ formData });
    getFlightDelay({ setResponse, url, setLoading });
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
    <ThemeProvider theme={themeToggle ? darkTheme : theme}>
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
            <LoadingGraph response={response} loading={loading} themeToggle={themeToggle} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Switch
                  checked={themeToggle}
                  onChange={event => {
                    setThemeToggle(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
