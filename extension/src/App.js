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

const ngrok_url = "https://b194-34-83-40-166.ngrok.io"; //"https://cc6f-34-83-40-166.ngrok.io";
const airline_options = [
  { value: "AA", label: "American Airlines Inc. (AA) " },
  { value: "AS", label: "Alaska Airlines Inc. (AS) " },
  { value: "B6", label: "JetBlue Airways (B6) " },
  { value: "DL", label: "Delta Air Lines Inc. (DL) " },
  { value: "UA", label: "United Air Lines Inc. (UA) " },
  { value: "WN", label: "Southwest Airlines Co. (WN) " },
  { value: "F9", label: "Frontier Airlines Inc. (F9) " },
  { value: "G4", label: "Allegiant Air (G4) " },
  { value: "HA", label: "Hawaiian Airlines Inc. (HA) " },
  { value: "NK", label: "Spirit Air Lines (NK) " }
];
const airport_options = [
  { label: "Springfield, MO: Springfield-Branson National (SGF) ", value: "SGF" },
  { label: "Hibbing, MN: Range Regional (HIB) ", value: "HIB" },
  { label: "Plattsburgh, NY: Plattsburgh International (PBG) ", value: "PBG" },
  { label: "Lincoln, NE: Lincoln Airport (LNK) ", value: "LNK" },
  { label: "Laredo, TX: Laredo International (LRD) ", value: "LRD" },
  { label: "Hancock/Houghton, MI: Houghton County Memorial (CMX) ", value: "CMX" },
  { label: "Myrtle Beach, SC: Myrtle Beach International (MYR) ", value: "MYR" },
  { label: "Newark, NJ: Newark Liberty International (EWR) ", value: "EWR" },
  { label: "Augusta, GA: Augusta Regional at Bush Field (AGS) ", value: "AGS" },
  { label: "North Bend/Coos Bay, OR: Southwest Oregon Regional (OTH) ", value: "OTH" },
  { label: "Gainesville, FL: Gainesville Regional (GNV) ", value: "GNV" },
  { label: "Tulsa, OK: Tulsa International (TUL) ", value: "TUL" },
  { label: "Washington, DC: Ronald Reagan Washington National (DCA) ", value: "DCA" },
  { label: "Boston, MA: Logan International (BOS) ", value: "BOS" },
  { label: "Aguadilla, PR: Rafael Hernandez (BQN) ", value: "BQN" },
  { label: "Rock Springs, WY: Southwest Wyoming Regional (RKS) ", value: "RKS" },
  { label: "Newport News/Williamsburg, VA: Newport News/Williamsburg International (PHF) ", value: "PHF" },
  { label: "Rapid City, SD: Rapid City Regional (RAP) ", value: "RAP" },
  { label: "Harrisburg, PA: Harrisburg International (MDT) ", value: "MDT" },
  { label: "Redding, CA: Redding Municipal (RDD) ", value: "RDD" },
  { label: "Cordova, AK: Merle K Mudhole Smith (CDV) ", value: "CDV" },
  { label: "Harlingen/San Benito, TX: Valley International (HRL) ", value: "HRL" },
  { label: "Monterey, CA: Monterey Regional (MRY) ", value: "MRY" },
  { label: "Beaumont/Port Arthur, TX: Jack Brooks Regional (BPT) ", value: "BPT" },
  { label: "Roswell, NM: Roswell International Air Center (ROW) ", value: "ROW" },
  { label: "Casper, WY: Casper/Natrona County International (CPR) ", value: "CPR" },
  { label: "Bristol/Johnson City/Kingsport, TN: Tri Cities (TRI) ", value: "TRI" },
  { label: "Montgomery, AL: Montgomery Regional (MGM) ", value: "MGM" },
  { label: "Brunswick, GA: Brunswick Golden Isles (BQK) ", value: "BQK" },
  { label: "Aspen, CO: Aspen Pitkin County Sardy Field (ASE) ", value: "ASE" },
  { label: "King Salmon, AK: King Salmon Airport (AKN) ", value: "AKN" },
  { label: "Santa Ana, CA: John Wayne Airport-Orange County (SNA) ", value: "SNA" },
  { label: "Honolulu, HI: Daniel K Inouye International (HNL) ", value: "HNL" },
  { label: "Fort Myers, FL: Southwest Florida International (RSW) ", value: "RSW" },
  { label: "Green Bay, WI: Green Bay Austin Straubel International (GRB) ", value: "GRB" },
  { label: "Baton Rouge, LA: Baton Rouge Metropolitan/Ryan Field (BTR) ", value: "BTR" },
  { label: "Anchorage, AK: Ted Stevens Anchorage International (ANC) ", value: "ANC" },
  { label: "New Haven, CT: Tweed New Haven (HVN) ", value: "HVN" },
  { label: "Fairbanks, AK: Fairbanks International (FAI) ", value: "FAI" },
  { label: "Riverton/Lander, WY: Riverton Regional (RIW) ", value: "RIW" },
  { label: "Valdosta, GA: Valdosta Regional (VLD) ", value: "VLD" },
  { label: "Traverse City, MI: Cherry Capital (TVC) ", value: "TVC" },
  { label: "Tampa, FL: Tampa International (TPA) ", value: "TPA" },
  { label: "Tyler, TX: Tyler Pounds Regional (TYR) ", value: "TYR" },
  { label: "Muskegon, MI: Muskegon County (MKG) ", value: "MKG" },
  { label: "Branson, MO: Branson Airport (BKG) ", value: "BKG" },
  { label: "Stockton, CA: Stockton Metropolitan (SCK) ", value: "SCK" },
  { label: "Salina, KS: Salina Regional (SLN) ", value: "SLN" },
  { label: "Fort Smith, AR: Fort Smith Regional (FSM) ", value: "FSM" },
  { label: "Pueblo, CO: Pueblo Memorial (PUB) ", value: "PUB" },
  { label: "Cheyenne, WY: Cheyenne Regional/Jerry Olson Field (CYS) ", value: "CYS" },
  { label: "Nantucket, MA: Nantucket Memorial (ACK) ", value: "ACK" },
  { label: "Adak Island, AK: Adak (ADK) ", value: "ADK" },
  { label: "Omaha, NE: Eppley Airfield (OMA) ", value: "OMA" },
  { label: "Minneapolis, MN: Minneapolis-St Paul International (MSP) ", value: "MSP" },
  { label: "Belleville, IL: Scott AFB/MidAmerica (BLV) ", value: "BLV" },
  { label: "Eagle, CO: Eagle County Regional (EGE) ", value: "EGE" },
  { label: "Tallahassee, FL: Tallahassee International (TLH) ", value: "TLH" },
  { label: "Helena, MT: Helena Regional (HLN) ", value: "HLN" },
  { label: "Sioux City, IA: Sioux Gateway Brig Gen Bud Day Field (SUX) ", value: "SUX" },
  { label: "Austin, TX: Austin - Bergstrom International (AUS) ", value: "AUS" },
  { label: "Seattle, WA: Seattle/Tacoma International (SEA) ", value: "SEA" },
  { label: "Columbus, GA: Columbus Airport (CSG) ", value: "CSG" },
  { label: "Jackson, WY: Jackson Hole (JAC) ", value: "JAC" },
  { label: "Mason City, IA: Mason City Municipal (MCW) ", value: "MCW" },
  { label: "Idaho Falls, ID: Idaho Falls Regional (IDA) ", value: "IDA" },
  { label: "North Platte, NE: North Platte Regional Airport Lee Bird Field (LBF) ", value: "LBF" },
  { label: "Alexandria, LA: Alexandria International (AEX) ", value: "AEX" },
  { label: "Daytona Beach, FL: Daytona Beach International (DAB) ", value: "DAB" },
  { label: "Flint, MI: Bishop International (FNT) ", value: "FNT" },
  { label: "Charleston, SC: Charleston AFB/International (CHS) ", value: "CHS" },
  { label: "Dallas, TX: Dallas Love Field (DAL) ", value: "DAL" },
  { label: "Johnstown, PA: John Murtha Johnstown-Cambria County (JST) ", value: "JST" },
  { label: "Alpena, MI: Alpena County Regional (APN) ", value: "APN" },
  { label: "Burbank, CA: Bob Hope (BUR) ", value: "BUR" },
  { label: "Staunton, VA: Shenandoah Valley Regional (SHD) ", value: "SHD" },
  { label: "Trenton, NJ: Trenton Mercer (TTN) ", value: "TTN" },
  { label: "Hobbs, NM: Lea County Regional (HOB) ", value: "HOB" },
  { label: "Gillette, WY: Gillette Campbell County (GCC) ", value: "GCC" },
  { label: "Liberal, KS: Liberal Mid-America Regional (LBL) ", value: "LBL" },
  { label: "San Antonio, TX: San Antonio International (SAT) ", value: "SAT" },
  { label: "Fort Wayne, IN: Fort Wayne International (FWA) ", value: "FWA" },
  { label: "Ontario, CA: Ontario International (ONT) ", value: "ONT" },
  { label: "Houston, TX: William P Hobby (HOU) ", value: "HOU" },
  { label: "Dillingham, AK: Dillingham Airport (DLG) ", value: "DLG" },
  { label: "Flagstaff, AZ: Flagstaff Pulliam (FLG) ", value: "FLG" },
  { label: "Billings, MT: Billings Logan International (BIL) ", value: "BIL" },
  { label: "Williston, ND: Williston Basin International (XWA) ", value: "XWA" },
  { label: "Latrobe, PA: Arnold Palmer Regional (LBE) ", value: "LBE" },
  { label: "Columbus, MS: Golden Triangle Regional (GTR) ", value: "GTR" },
  { label: "Cody, WY: Yellowstone Regional (COD) ", value: "COD" },
  { label: "Yakutat, AK: Yakutat Airport (YAK) ", value: "YAK" },
  { label: "Williamsport, PA: Williamsport Regional (IPT) ", value: "IPT" },
  { label: "Mobile, AL: Mobile Downtown (BFM) ", value: "BFM" },
  { label: "Rochester, NY: Greater Rochester International (ROC) ", value: "ROC" },
  { label: "Jacksonville, FL: Jacksonville International (JAX) ", value: "JAX" },
  { label: "Pago Pago, TT: Pago Pago International (PPG) ", value: "PPG" },
  { label: "Joplin, MO: Joplin Regional (JLN) ", value: "JLN" },
  { label: "Hartford, CT: Bradley International (BDL) ", value: "BDL" },
  { label: "Denver, CO: Denver International (DEN) ", value: "DEN" },
  { label: "Rochester, MN: Rochester International (RST) ", value: "RST" },
  { label: "Cold Bay, AK: Cold Bay Airport (CDB) ", value: "CDB" },
  { label: "Las Vegas, NV: McCarran International (LAS) ", value: "LAS" },
  { label: "Philadelphia, PA: Philadelphia International (PHL) ", value: "PHL" },
  { label: "Sun Valley/Hailey/Ketchum, ID: Friedman Memorial (SUN) ", value: "SUN" },
  { label: "Kansas City, MO: Kansas City International (MCI) ", value: "MCI" },
  { label: "Mosinee, WI: Central Wisconsin (CWA) ", value: "CWA" },
  { label: "Fayetteville, NC: Fayetteville Regional/Grannis Field (FAY) ", value: "FAY" },
  { label: "Presque Isle/Houlton, ME: Presque Isle International (PQI) ", value: "PQI" },
  { label: "Cedar City, UT: Cedar City Regional (CDC) ", value: "CDC" },
  { label: "Bismarck/Mandan, ND: Bismarck Municipal (BIS) ", value: "BIS" },
  { label: "Rockford, IL: Chicago/Rockford International (RFD) ", value: "RFD" },
  { label: "Petersburg, AK: Petersburg James A Johnson (PSG) ", value: "PSG" },
  { label: "Roanoke, VA: Roanoke Blacksburg Regional Woodrum Field (ROA) ", value: "ROA" },
  { label: "Kalispell, MT: Glacier Park International (FCA) ", value: "FCA" },
  { label: "Mobile, AL: Mobile Regional (MOB) ", value: "MOB" },
  { label: "Juneau, AK: Juneau International (JNU) ", value: "JNU" },
  { label: "Gulfport/Biloxi, MS: Gulfport-Biloxi International (GPT) ", value: "GPT" },
  { label: "Watertown, NY: Watertown International (ART) ", value: "ART" },
  { label: "Lubbock, TX: Lubbock Preston Smith International (LBB) ", value: "LBB" },
  { label: "Stillwater, OK: Stillwater Regional (SWO) ", value: "SWO" },
  { label: "Ogden, UT: Ogden-Hinckley (OGD) ", value: "OGD" },
  { label: "Kahului, HI: Kahului Airport (OGG) ", value: "OGG" },
  { label: "Madison, WI: Dane County Regional-Truax Field (MSN) ", value: "MSN" },
  { label: "Albany, NY: Albany International (ALB) ", value: "ALB" },
  { label: "Allentown/Bethlehem/Easton, PA: Lehigh Valley International (ABE) ", value: "ABE" },
  { label: "Twin Falls, ID: Joslin Field - Magic Valley Regional (TWF) ", value: "TWF" },
  { label: "Quincy, IL: Quincy Regional-Baldwin Field (UIN) ", value: "UIN" },
  { label: "Cleveland, OH: Cleveland-Hopkins International (CLE) ", value: "CLE" },
  { label: "Indianapolis, IN: Indianapolis International (IND) ", value: "IND" },
  { label: "Bangor, ME: Bangor International (BGR) ", value: "BGR" },
  { label: "Greer, SC: Greenville-Spartanburg International (GSP) ", value: "GSP" },
  { label: "Bozeman, MT: Bozeman Yellowstone International (BZN) ", value: "BZN" },
  { label: "Fort Dodge, IA: Fort Dodge Regional (FOD) ", value: "FOD" },
  { label: "Devils Lake, ND: Devils Lake Regional (DVL) ", value: "DVL" },
  { label: "Asheville, NC: Asheville Regional (AVL) ", value: "AVL" },
  { label: "Grand Forks, ND: Grand Forks International (GFK) ", value: "GFK" },
  { label: "Yuma, AZ: Yuma MCAS/Yuma International (YUM) ", value: "YUM" },
  { label: "White Plains, NY: Westchester County (HPN) ", value: "HPN" },
  { label: "Worcester, MA: Worcester Regional (ORH) ", value: "ORH" },
  { label: "Gustavus, AK: Gustavus Airport (GST) ", value: "GST" },
  { label: "Lexington, KY: Blue Grass (LEX) ", value: "LEX" },
  { label: "Appleton, WI: Appleton International (ATW) ", value: "ATW" },
  { label: "Tucson, AZ: Tucson International (TUS) ", value: "TUS" },
  { label: "Arcata/Eureka, CA: California Redwood Coast Humboldt County (ACV) ", value: "ACV" },
  { label: "Cedar Rapids/Iowa City, IA: The Eastern Iowa (CID) ", value: "CID" },
  { label: "Wichita Falls, TX: Sheppard AFB/Wichita Falls Municipal (SPS) ", value: "SPS" },
  { label: "Evansville, IN: Evansville Regional (EVV) ", value: "EVV" },
  { label: "Midland/Odessa, TX: Midland International Air and Space Port (MAF) ", value: "MAF" },
  { label: "Punta Gorda, FL: Punta Gorda Airport (PGD) ", value: "PGD" },
  { label: "Raleigh/Durham, NC: Raleigh-Durham International (RDU) ", value: "RDU" },
  { label: "Wenatchee, WA: Pangborn Memorial (EAT) ", value: "EAT" },
  { label: "Little Rock, AR: Bill and Hillary Clinton Nat Adams Field (LIT) ", value: "LIT" },
  { label: "Sheridan, WY: Sheridan County (SHR) ", value: "SHR" },
  { label: "Long Beach, CA: Long Beach Airport (LGB) ", value: "LGB" },
  { label: "Chicago, IL: Chicago O'Hare International (ORD) ", value: "ORD" },
  { label: "Pensacola, FL: Pensacola International (PNS) ", value: "PNS" },
  { label: "Portland, OR: Portland International (PDX) ", value: "PDX" },
  { label: "Charleston/Dunbar, WV: Yeager (CRW) ", value: "CRW" },
  { label: "St. George, UT: St George Regional (SGU) ", value: "SGU" },
  { label: "Vernal, UT: Vernal Regional (VEL) ", value: "VEL" },
  { label: "Palm Springs, CA: Palm Springs International (PSP) ", value: "PSP" },
  { label: "Wilmington, DE: New Castle (ILG) ", value: "ILG" },
  { label: "St. Petersburg, FL: St Pete Clearwater International (PIE) ", value: "PIE" },
  { label: "Syracuse, NY: Syracuse Hancock International (SYR) ", value: "SYR" },
  { label: "Fort Lauderdale, FL: Fort Lauderdale-Hollywood International (FLL) ", value: "FLL" },
  { label: "St. Louis, MO: St Louis Lambert International (STL) ", value: "STL" },
  { label: "Lawton/Fort Sill, OK: Lawton-Fort Sill Regional (LAW) ", value: "LAW" },
  { label: "Corpus Christi, TX: Corpus Christi International (CRP) ", value: "CRP" },
  { label: "San Angelo, TX: San Angelo Regional/Mathis Field (SJT) ", value: "SJT" },
  { label: "Sacramento, CA: Sacramento International (SMF) ", value: "SMF" },
  { label: "Clarksburg/Fairmont, WV: North Central West Virginia (CKB) ", value: "CKB" },
  { label: "Charlottesville, VA: Charlottesville Albemarle (CHO) ", value: "CHO" },
  { label: "Del Rio, TX: Del Rio International (DRT) ", value: "DRT" },
  { label: "Montrose/Delta, CO: Montrose Regional (MTJ) ", value: "MTJ" },
  { label: "Waterloo, IA: Waterloo Regional (ALO) ", value: "ALO" },
  { label: "Wrangell, AK: Wrangell Airport (WRG) ", value: "WRG" },
  { label: "Kapalua, HI: Kapalua Airport (JHM) ", value: "JHM" },
  { label: "Rhinelander, WI: Rhinelander/Oneida County (RHI) ", value: "RHI" },
  { label: "Aberdeen, SD: Aberdeen Regional (ABR) ", value: "ABR" },
  { label: "Boise, ID: Boise Air Terminal (BOI) ", value: "BOI" },
  { label: "Sanford, FL: Orlando Sanford International (SFB) ", value: "SFB" },
  { label: "Atlanta, GA: Hartsfield-Jackson Atlanta International (ATL) ", value: "ATL" },
  { label: "Columbia, SC: Columbia Metropolitan (CAE) ", value: "CAE" },
  { label: "Shreveport, LA: Shreveport Regional (SHV) ", value: "SHV" },
  { label: "Scranton/Wilkes-Barre, PA: Wilkes Barre Scranton International (AVP) ", value: "AVP" },
  { label: "Hilton Head, SC: Hilton Head Airport (HHH) ", value: "HHH" },
  { label: "Bellingham, WA: Bellingham International (BLI) ", value: "BLI" },
  { label: "San Diego, CA: San Diego International (SAN) ", value: "SAN" },
  { label: "Brainerd, MN: Brainerd Lakes Regional (BRD) ", value: "BRD" },
  { label: "Eau Claire, WI: Chippewa Valley Regional (EAU) ", value: "EAU" },
  { label: "Garden City, KS: Garden City Regional (GCK) ", value: "GCK" },
  { label: "Pellston, MI: Pellston Regional Airport of Emmet County (PLN) ", value: "PLN" },
  { label: "Fresno, CA: Fresno Yosemite International (FAT) ", value: "FAT" },
  { label: "Scottsbluff, NE: Western Neb. Regional/William B. Heilig Field (BFF) ", value: "BFF" },
  { label: "Hattiesburg/Laurel, MS: Hattiesburg-Laurel Regional (PIB) ", value: "PIB" },
  { label: "Great Falls, MT: Great Falls International (GTF) ", value: "GTF" },
  { label: "Grand Rapids, MI: Gerald R. Ford International (GRR) ", value: "GRR" },
  { label: "Kodiak, AK: Kodiak Airport (ADQ) ", value: "ADQ" },
  { label: "Escanaba, MI: Delta County (ESC) ", value: "ESC" },
  { label: "Yakima, WA: Yakima Air Terminal/McAllister Field (YKM) ", value: "YKM" },
  { label: "Moline, IL: Quad City International (MLI) ", value: "MLI" },
  { label: "Toledo, OH: Toledo Express (TOL) ", value: "TOL" },
  { label: "Hayden, CO: Yampa Valley (HDN) ", value: "HDN" },
  { label: "New Bern/Morehead/Beaufort, NC: Coastal Carolina Regional (EWN) ", value: "EWN" },
  { label: "Erie, PA: Erie International/Tom Ridge Field (ERI) ", value: "ERI" },
  { label: "Owensboro, KY: Owensboro Daviess County Regional (OWB) ", value: "OWB" },
  { label: "Salisbury, MD: Salisbury-Ocean City/Wicomico Regional (SBY) ", value: "SBY" },
  { label: "Moab, UT: Canyonlands Field (CNY) ", value: "CNY" },
  { label: "Martha's Vineyard, MA: Martha's Vineyard Airport (MVY) ", value: "MVY" },
  { label: "Columbus, OH: John Glenn Columbus International (CMH) ", value: "CMH" },
  { label: "Charlotte, NC: Charlotte Douglas International (CLT) ", value: "CLT" },
  { label: "Fargo, ND: Hector International (FAR) ", value: "FAR" },
  { label: "Chicago, IL: Chicago Midway International (MDW) ", value: "MDW" },
  { label: "Bloomington/Normal, IL: Central Il Regional Airport at Bloomington (BMI) ", value: "BMI" },
  { label: "Dickinson, ND: Dickinson - Theodore Roosevelt Regional (DIK) ", value: "DIK" },
  { label: "Wichita, KS: Wichita Dwight D Eisenhower National (ICT) ", value: "ICT" },
  { label: "San Francisco, CA: San Francisco International (SFO) ", value: "SFO" },
  { label: "Cape Girardeau, MO: Cape Girardeau Regional (CGI) ", value: "CGI" },
  { label: "Hoolehua, HI: Molokai (MKK) ", value: "MKK" },
  { label: "Santa Fe, NM: Santa Fe Municipal (SAF) ", value: "SAF" },
  { label: "Marquette, MI: Sawyer International (MQT) ", value: "MQT" },
  { label: "Phoenix, AZ: Phoenix Sky Harbor International (PHX) ", value: "PHX" },
  { label: "Spokane, WA: Spokane International (GEG) ", value: "GEG" },
  { label: "Eugene, OR: Mahlon Sweet Field (EUG) ", value: "EUG" },
  { label: "Albuquerque, NM: Albuquerque International Sunport (ABQ) ", value: "ABQ" },
  { label: "Dayton, OH: James M Cox/Dayton International (DAY) ", value: "DAY" },
  { label: "Victoria, TX: Victoria Regional (VCT) ", value: "VCT" },
  { label: "New Orleans, LA: Louis Armstrong New Orleans International (MSY) ", value: "MSY" },
  { label: "Ponce, PR: Mercedita (PSE) ", value: "PSE" },
  { label: "Duluth, MN: Duluth International (DLH) ", value: "DLH" },
  { label: "Phoenix, AZ: Phoenix - Mesa Gateway (AZA) ", value: "AZA" },
  { label: "Ketchikan, AK: Ketchikan International (KTN) ", value: "KTN" },
  { label: "Pittsburgh, PA: Pittsburgh International (PIT) ", value: "PIT" },
  { label: "Manchester, NH: Manchester-Boston Regional (MHT) ", value: "MHT" },
  { label: "Abilene, TX: Abilene Regional (ABI) ", value: "ABI" },
  { label: "Portland, ME: Portland International Jetport (PWM) ", value: "PWM" },
  { label: "Longview, TX: East Texas Regional (GGG) ", value: "GGG" },
  { label: "Savannah, GA: Savannah/Hilton Head International (SAV) ", value: "SAV" },
  { label: "Lewisburg, WV: Greenbrier Valley (LWB) ", value: "LWB" },
  { label: "New York, NY: LaGuardia (LGA) ", value: "LGA" },
  { label: "International Falls, MN: Falls International Einarson Field (INL) ", value: "INL" },
  { label: "Portsmouth, NH: Portsmouth International at Pease (PSM) ", value: "PSM" },
  { label: "San Jose, CA: Norman Y. Mineta San Jose International (SJC) ", value: "SJC" },
  { label: "Killeen, TX: Robert Gray AAF (GRK) ", value: "GRK" },
  { label: "Hyannis, MA: Barnstable Municipal-Boardman/Polando Field (HYA) ", value: "HYA" },
  { label: "Newburgh/Poughkeepsie, NY: New York Stewart International (SWF) ", value: "SWF" },
  { label: "Unalaska, AK: Unalaska Airport (DUT) ", value: "DUT" },
  { label: "Williston, ND: Sloulin Field International (ISN) ", value: "ISN" },
  { label: "Lynchburg, VA: Lynchburg Regional/Preston Glenn Field (LYH) ", value: "LYH" },
  { label: "Saipan, TT: Francisco C. Ada Saipan International (SPN) ", value: "SPN" },
  { label: "Lihue, HI: Lihue Airport (LIH) ", value: "LIH" },
  { label: "Columbus, OH: Rickenbacker International (LCK) ", value: "LCK" },
  { label: "Oakland, CA: Metropolitan Oakland International (OAK) ", value: "OAK" },
  { label: "San Juan, PR: Luis Munoz Marin International (SJU) ", value: "SJU" },
  { label: "Minot, ND: Minot International (MOT) ", value: "MOT" },
  { label: "Jackson/Vicksburg, MS: Jackson Medgar Wiley Evers International (JAN) ", value: "JAN" },
  { label: "Medford, OR: Rogue Valley International - Medford (MFR) ", value: "MFR" },
  { label: "Valparaiso, FL: Eglin AFB Destin Fort Walton Beach (VPS) ", value: "VPS" },
  { label: "Guam, TT: Guam International (GUM) ", value: "GUM" },
  { label: "Dallas/Fort Worth, TX: Dallas/Fort Worth International (DFW) ", value: "DFW" },
  { label: "West Yellowstone, MT: Yellowstone (WYS) ", value: "WYS" },
  { label: "St. Cloud, MN: St. Cloud Regional (STC) ", value: "STC" },
  { label: "Amarillo, TX: Rick Husband Amarillo International (AMA) ", value: "AMA" },
  { label: "Pocatello, ID: Pocatello Regional (PIH) ", value: "PIH" },
  { label: "Hays, KS: Hays Regional (HYS) ", value: "HYS" },
  { label: "Providence, RI: Theodore Francis Green State (PVD) ", value: "PVD" },
  { label: "Ashland, WV: Tri-State/Milton J. Ferguson Field (HTS) ", value: "HTS" },
  { label: "Albany, GA: Southwest Georgia Regional (ABY) ", value: "ABY" },
  { label: "Brownsville, TX: Brownsville South Padre Island International (BRO) ", value: "BRO" },
  { label: "Knoxville, TN: McGhee Tyson (TYS) ", value: "TYS" },
  { label: "Washington, DC: Washington Dulles International (IAD) ", value: "IAD" },
  { label: "Peoria, IL: General Downing - Peoria International (PIA) ", value: "PIA" },
  { label: "Monroe, LA: Monroe Regional (MLU) ", value: "MLU" },
  { label: "Durango, CO: Durango La Plata County (DRO) ", value: "DRO" },
  { label: "Lewiston, ID: Lewiston Nez Perce County (LWS) ", value: "LWS" },
  { label: "Dubuque, IA: Dubuque Regional (DBQ) ", value: "DBQ" },
  { label: "Baltimore, MD: Baltimore/Washington International Thurgood Marshall (BWI) ", value: "BWI" },
  { label: "Deadhorse, AK: Deadhorse Airport (SCC) ", value: "SCC" },
  { label: "College Station/Bryan, TX: Easterwood Field (CLL) ", value: "CLL" },
  { label: "Orlando, FL: Orlando International (MCO) ", value: "MCO" },
  { label: "Pierre, SD: Pierre Regional (PIR) ", value: "PIR" },
  { label: "Springfield, IL: Abraham Lincoln Capital (SPI) ", value: "SPI" },
  { label: "State College, PA: University Park (SCE) ", value: "SCE" },
  { label: "Nashville, TN: Nashville International (BNA) ", value: "BNA" },
  { label: "Jacksonville/Camp Lejeune, NC: Albert J Ellis (OAJ) ", value: "OAJ" },
  { label: "Buffalo, NY: Buffalo Niagara International (BUF) ", value: "BUF" },
  { label: "Huntsville, AL: Huntsville International-Carl T Jones Field (HSV) ", value: "HSV" },
  { label: "Des Moines, IA: Des Moines International (DSM) ", value: "DSM" },
  { label: "Hagerstown, MD: Hagerstown Regional-Richard A. Henson Field (HGR) ", value: "HGR" },
  { label: "Prescott, AZ: Prescott Regional Ernest A Love Field (PRC) ", value: "PRC" },
  { label: "Dothan, AL: Dothan Regional (DHN) ", value: "DHN" },
  { label: "Christiansted, VI: Henry E. Rohlsen (STX) ", value: "STX" },
  { label: "Kearney, NE: Kearney Regional (EAR) ", value: "EAR" },
  { label: "Greenville, NC: Pitt Greenville (PGV) ", value: "PGV" },
  { label: "Columbia, MO: Columbia Regional (COU) ", value: "COU" },
  { label: "Manhattan/Ft. Riley, KS: Manhattan Regional (MHK) ", value: "MHK" },
  { label: "Bend/Redmond, OR: Roberts Field (RDM) ", value: "RDM" },
  { label: "Ogdensburg, NY: Ogdensburg International (OGS) ", value: "OGS" },
  { label: "El Paso, TX: El Paso International (ELP) ", value: "ELP" },
  { label: "Dodge City, KS: Dodge City Regional (DDC) ", value: "DDC" },
  { label: "Elmira/Corning, NY: Elmira/Corning Regional (ELM) ", value: "ELM" },
  { label: "Pullman, WA: Pullman Moscow Regional (PUW) ", value: "PUW" },
  { label: "Sarasota/Bradenton, FL: Sarasota/Bradenton International (SRQ) ", value: "SRQ" },
  { label: "Missoula, MT: Missoula International (MSO) ", value: "MSO" },
  { label: "Cincinnati, OH: Cincinnati/Northern Kentucky International (CVG) ", value: "CVG" },
  { label: "Nome, AK: Nome Airport (OME) ", value: "OME" },
  { label: "Panama City, FL: Northwest Florida Beaches International (ECP) ", value: "ECP" },
  { label: "Niagara Falls, NY: Niagara Falls International (IAG) ", value: "IAG" },
  { label: "Champaign/Urbana, IL: University of Illinois/Willard (CMI) ", value: "CMI" },
  { label: "Charlotte Amalie, VI: Cyril E King (STT) ", value: "STT" },
  { label: "San Luis Obispo, CA: San Luis County Regional (SBP) ", value: "SBP" },
  { label: "Bethel, AK: Bethel Airport (BET) ", value: "BET" },
  { label: "Kona, HI: Ellison Onizuka Kona International at Keahole (KOA) ", value: "KOA" },
  { label: "La Crosse, WI: La Crosse Regional (LSE) ", value: "LSE" },
  { label: "Islip, NY: Long Island MacArthur (ISP) ", value: "ISP" },
  { label: "Florence, SC: Florence Regional (FLO) ", value: "FLO" },
  { label: "Houston, TX: George Bush Intercontinental/Houston (IAH) ", value: "IAH" },
  { label: "Santa Rosa, CA: Charles M. Schulz - Sonoma County (STS) ", value: "STS" },
  { label: "West Palm Beach/Palm Beach, FL: Palm Beach International (PBI) ", value: "PBI" },
  { label: "Oklahoma City, OK: Will Rogers World (OKC) ", value: "OKC" },
  { label: "Santa Barbara, CA: Santa Barbara Municipal (SBA) ", value: "SBA" },
  { label: "Akron, OH: Akron-Canton Regional (CAK) ", value: "CAK" },
  { label: "Milwaukee, WI: General Mitchell International (MKE) ", value: "MKE" },
  { label: "Reno, NV: Reno/Tahoe International (RNO) ", value: "RNO" },
  { label: "Sitka, AK: Sitka Rocky Gutierrez (SIT) ", value: "SIT" },
  { label: "Binghamton, NY: Greater Binghamton/Edwin A. Link Field (BGM) ", value: "BGM" },
  { label: "Lafayette, LA: Lafayette Regional Paul Fournet Field (LFT) ", value: "LFT" },
  { label: "Norfolk, VA: Norfolk International (ORF) ", value: "ORF" },
  { label: "Bakersfield, CA: Meadows Field (BFL) ", value: "BFL" },
  { label: "Santa Maria, CA: Santa Maria Public/Capt. G. Allan Hancock Field (SMX) ", value: "SMX" },
  { label: "Butte, MT: Bert Mooney (BTM) ", value: "BTM" },
  { label: "Lansing, MI: Capital Region International (LAN) ", value: "LAN" },
  { label: "Kotzebue, AK: Ralph Wien Memorial (OTZ) ", value: "OTZ" },
  { label: "New York, NY: John F. Kennedy International (JFK) ", value: "JFK" },
  { label: "Hilo, HI: Hilo International (ITO) ", value: "ITO" },
  { label: "Lanai, HI: Lanai Airport (LNY) ", value: "LNY" },
  { label: "Burlington, VT: Burlington International (BTV) ", value: "BTV" },
  { label: "Gunnison, CO: Gunnison-Crested Butte Regional (GUC) ", value: "GUC" },
  { label: "Decatur, IL: Decatur Airport (DEC) ", value: "DEC" },
  { label: "Greensboro/High Point, NC: Piedmont Triad International (GSO) ", value: "GSO" },
  { label: "Fayetteville, AR: Northwest Arkansas Regional (XNA) ", value: "XNA" },
  { label: "Grand Island, NE: Central Nebraska Regional (GRI) ", value: "GRI" },
  { label: "Grand Junction, CO: Grand Junction Regional (GJT) ", value: "GJT" },
  { label: "Watertown, SD: Watertown Regional (ATY) ", value: "ATY" },
  { label: "Lake Charles, LA: Lake Charles Regional (LCH) ", value: "LCH" },
  { label: "Mission/McAllen/Edinburg, TX: McAllen Miller International (MFE) ", value: "MFE" },
  { label: "Alamosa, CO: San Luis Valley Regional/Bergman Field (ALS) ", value: "ALS" },
  { label: "Jamestown, ND: Jamestown Regional (JMS) ", value: "JMS" },
  { label: "Detroit, MI: Detroit Metro Wayne County (DTW) ", value: "DTW" },
  { label: "Elko, NV: Elko Regional (EKO) ", value: "EKO" },
  { label: "Kalamazoo, MI: Kalamazoo/Battle Creek International (AZO) ", value: "AZO" },
  { label: "Sioux Falls, SD: Joe Foss Field (FSD) ", value: "FSD" },
  { label: "Memphis, TN: Memphis International (MEM) ", value: "MEM" },
  { label: "Laramie, WY: Laramie Regional (LAR) ", value: "LAR" },
  { label: "Wilmington, NC: Wilmington International (ILM) ", value: "ILM" },
  { label: "Birmingham, AL: Birmingham-Shuttlesworth International (BHM) ", value: "BHM" },
  { label: "South Bend, IN: South Bend International (SBN) ", value: "SBN" },
  { label: "Salt Lake City, UT: Salt Lake City International (SLC) ", value: "SLC" },
  { label: "Waco, TX: Waco Regional (ACT) ", value: "ACT" },
  { label: "Chattanooga, TN: Lovell Field (CHA) ", value: "CHA" },
  { label: "Richmond, VA: Richmond International (RIC) ", value: "RIC" },
  { label: "Provo, UT: Provo Municipal (PVU) ", value: "PVU" },
  { label: "Atlantic City, NJ: Atlantic City International (ACY) ", value: "ACY" },
  { label: "Barrow, AK: Wiley Post/Will Rogers Memorial (BRW) ", value: "BRW" },
  { label: "Saginaw/Bay City/Midland, MI: MBS International (MBS) ", value: "MBS" },
  { label: "Mammoth Lakes, CA: Mammoth Lakes Airport (MMH) ", value: "MMH" },
  { label: "Colorado Springs, CO: City of Colorado Springs Municipal (COS) ", value: "COS" },
  { label: "Los Angeles, CA: Los Angeles International (LAX) ", value: "LAX" },
  { label: "Key West, FL: Key West International (EYW) ", value: "EYW" },
  { label: "Louisville, KY: Louisville Muhammad Ali International (SDF) ", value: "SDF" },
  { label: "Meridian, MS: Key Field (MEI) ", value: "MEI" },
  { label: "Miami, FL: Miami International (MIA) ", value: "MIA" },
  { label: "Texarkana, AR: Texarkana Regional-Webb Field (TXK) ", value: "TXK" },
  { label: "Walla Walla, WA: Walla Walla Regional (ALW) ", value: "ALW" },
  { label: "Bemidji, MN: Bemidji Regional (BJI) ", value: "BJI" },
  { label: "Concord, NC: Concord Padgett Regional (USA) ", value: "USA" },
  { label: "Ithaca/Cortland, NY: Ithaca Tompkins Regional (ITH) ", value: "ITH" },
  { label: "Melbourne, FL: Melbourne International (MLB) ", value: "MLB" },
  { label: "Sault Ste. Marie, MI: Chippewa County International (CIU) ", value: "CIU" },
  { label: "Paducah, KY: Barkley Regional (PAH) ", value: "PAH" },
  { label: "Everett, WA: Snohomish County (PAE) ", value: "PAE" },
  { label: "Iron Mountain/Kingsfd, MI: Ford (IMT) ", value: "IMT" },
  { label: "Pasco/Kennewick/Richland, WA: Tri Cities (PSC) ", value: "PSC" }
];
const selectFieldDict = {
  origin: { options: airport_options, label: "Origin", id: "origin" },
  destination: { options: airport_options, label: "Destination", id: "destination" },
  airline: { options: airline_options, label: "Airline", id: "airline" }
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
  console.log({ url });
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
