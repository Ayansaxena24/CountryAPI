import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CountryInfo from "./CountryInfo";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material