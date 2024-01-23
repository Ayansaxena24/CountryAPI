import { shallow, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import { act } from "react-router-dom";

// Mock the fetch function
const mockFetch = jest.fn();

global.fetch = mockFetch;
