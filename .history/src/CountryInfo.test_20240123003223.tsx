import { shallow, render, mount, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

const mockData = {
  // ... (your mock data)
};

describe("CountryInfo", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BrowserRouter><CountryInfo /></BrowserRouter>);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the table rows correctly", () => {
    const wrapper = shallow(<CountryInfo />);
    const rows = wrapper.find('TableRow');
    expect(rows).toHaveLength(4); // Assuming there are four rows in your component
  });

  it("displays the country name and flag", () => {
    const wrapper = shallow(<CountryInfo />);
    wrapper.setState({ countryData: mockData }); // Assuming you use local state to store countryData
    const countryName = wrapper.find('p.font-bold.text-4xl');
    const flagImage = wrapper.find('img');
    expect(countryName.text()).toBe(mockData.name.common);
    expect(flagImage.prop('src')).toBe(mockData.flags.png);
  });

  it("handles 'Back' button click correctly", () => {
    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigateMock,
    }));
    
    const wrapper = shallow(<CountryInfo />);
    const backButton = wrapper.find('button');
    backButton.simulate('click');
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("displays 'CAPITAL WEATHER' button when weatherInfo is null", () => {
    const wrapper = shallow(<CountryInfo />);
    wrapper.setState({ weatherInfo: null });
    const weatherButton = wrapper.find('Button');
    expect(weatherButton.exists()).toBe(true);
    expect(weatherButton.text()).toBe('CAPITAL WEATHER');
  });

  it("displays weather information when weatherInfo is available", async () => {
    const mockWeatherData = {
      main: { temp: 25, feels_like: 22 },
      wind: { speed: 5 },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    const wrapper = mount(<CountryInfo />);
    await act(async () => {
      await wrapper.find('Button').simulate('click');
    });

    wrapper.update();

    const temperatureCell = wrapper.findWhere(
      (node) => node.type() === 'td' && node.text() === 'TEMPERATURE'
    );
    const windSpeedCell = wrapper.findWhere(
      (node) => node.type() === 'td' && node.text() === 'WIND SPEED'
    );

    expect(temperatureCell.next().text()).toBe(`${mockWeatherData.main.temp}`);
    expect(windSpeedCell.next().text()).toBe(`${mockWeatherData.wind.speed}`);
  });
});


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
