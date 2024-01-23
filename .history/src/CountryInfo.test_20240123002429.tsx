import { shallow, configure, render } from "enzyme";
import CountryInfo from "./CountryInfo";
// import { act } from 'react-dom/test-utils';

import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
configure({ adapter: new Adapter() });

const mockData = {
    name: {
      common: 'India',
      official: 'Republic of India',
      nativeName: {
        eng: {
          official: 'Republic of India',
          common: 'India',
        },
        hin: {
          official: 'भारत गणराज्य',
          common: 'भारत',
        },
        tam: {
          official: 'இந்தியா',
          common: 'இந்தியா',
        },
      },
    },
    tld: ['.in'],
    cca2: 'IN',
    ccn3: '356',
    cca3: 'IND',
    cioc: 'IND',
    independent: true,
    status: 'officially-assigned',
    unMember: true,
    currencies: {
      INR: {
        name: 'Indian Rupee',
        symbol: '₹',
      },
    },
    idd: {
      root: '+9',
      suffixes: [''],
    },
    capital: ['New Delhi'],
    altSpellings: ['IN', 'Bhārat', 'Republic of India', 'Bharat Ganrajya', 'இந்தியா'],
    region: 'Asia',
    subregion: 'Southern Asia',
    languages: {
      eng: 'English',
      hin: 'Hindi',
      tam: 'Tamil',
    },
    translations: {
      ara: {
        official: 'الهند',
        common: 'الهند',
      },
      // Add translations for other languages as needed
    },
    latlng: [20, 77],
    landlocked: false,
    borders: ['BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK'],
    area: 3287590,
    demonyms: {
      eng: {
        f: 'Indian',
        m: 'Indian',
      },
      fra: {
        f: 'Indienne',
        m: 'Indien',
      },
      // Add demonyms for other languages as needed
    },
    flag: '🇮🇳',
    maps: {
      googleMaps: 'https://goo.gl/maps/WSk3fLwG4vtPQetp7',
      openStreetMaps: 'https://www.openstreetmap.org/relation/304716',
    },
    population: 1380004385,
    gini: {
      '2011': 35.7,
    },
    fifa: 'IND',
    car: {
      signs: [''],
      side: 'left',
    },
    timezones: ['UTC+05:30'],
    continents: ['Asia'],
    flags: {
      png: 'https://flagcdn.com/w320/in.png',
      svg: 'https://flagcdn.com/in.svg',
      alt: 'The flag of India is composed of three equal horizontal stripes. ...he Ashoka Chakra — is centered in the white band.',
    },
    coatOfArms: {
      png: 'https://mainfacts.com/media/images/coats_of_arms/in.png',
      svg: 'https://mainfacts.com/media/images/coats_of_arms/in.svg',
    },
    startOfWeek: 'monday',
    capitalInfo: {
      latlng: [20, 77],
    },
    postalCode: {
      format: '######',
      regex: '^(\\d{6})$',
    },
  };

describe("CountryInfo", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<BrowserRouter><CountryInfo /> </BrowserRouter>);
        expect(wrapper.exists()).toBe(true);
    });

    it("renders the table", () => {
        const wrapper = render(<BrowserRouter><CountryInfo /> </BrowserRouter>);
        expect(wrapper.find("Table")).toHaveLength(1);
    });

        
});