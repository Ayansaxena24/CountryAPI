// import {fireEvent, render } from "@testing-library/react";
// import '@testing-library/jest-dom';
import { shallow, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import { BrowserRouter } from 'react-router-dom';
import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
// const countryData = {
//     state : {
//         name: {
//           common: 'India',
//           official: 'Republic of India',
//           nativeName: {
//             eng: {
//               official: 'Republic of India',
//               common: 'India',
//             },
//             hin: {
//               official: 'भारत गणराज्य',
//               common: 'भारत',
//             },
//             tam: {
//               official: 'இந்தியா',
//               common: 'இந்தியா',
//             },
//           },
//         },
//         tld: ['.in'],
//         cca2: 'IN',
//         ccn3: '356',
//         cca3: 'IND',
//         cioc: 'IND',
//         independent: true,
//         status: 'officially-assigned',
//         unMember: true,
//         currencies: {
//           INR: {
//             name: 'Indian Rupee',
//             symbol: '₹',
//           },
//         },
//         idd: {
//           root: '+9',
//           suffixes: [''],
//         },
//         capital: ['New Delhi'],
//         altSpellings: ['IN', 'Bhārat', 'Republic of India', 'Bharat Ganrajya', 'இந்தியா'],
//         region: 'Asia',
//         subregion: 'Southern Asia',
//         languages: {
//           eng: 'English',
//           hin: 'Hindi',
//           tam: 'Tamil',
//         },
//         translations: {
//           ara: {
//             official: 'الهند',
//             common: 'الهند',
//           },
//           // Add translations for other languages as needed
//         },
//         latlng: [20, 77],
//         landlocked: false,
//         borders: ['BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK'],
//         area: 3287590,
//         demonyms: {
//           eng: {
//             f: 'Indian',
//             m: 'Indian',
//           },
//           fra: {
//             f: 'Indienne',
//             m: 'Indien',
//           },
//           // Add demonyms for other languages as needed
//         },
//         flag: '🇮🇳',
//         maps: {
//           googleMaps: 'https://goo.gl/maps/WSk3fLwG4vtPQetp7',
//           openStreetMaps: 'https://www.openstreetmap.org/relation/304716',
//         },
//         population: 1380004385,
//         gini: {
//           '2011': 35.7,
//         },
//         fifa: 'IND',
//         car: {
//           signs: [''],
//           side: 'left',
//         },
//         timezones: ['UTC+05:30'],
//         continents: ['Asia'],
//         flags: {
//           png: 'https://flagcdn.com/w320/in.png',
//           svg: 'https://flagcdn.com/in.svg',
//           alt: 'The flag of India is composed of three equal horizontal stripes. ...he Ashoka Chakra — is centered in the white band.',
//         },
//         coatOfArms: {
//           png: 'https://mainfacts.com/media/images/coats_of_arms/in.png',
//           svg: 'https://mainfacts.com/media/images/coats_of_arms/in.svg',
//         },
//         startOfWeek: 'monday',
//         capitalInfo: {
//           latlng: [20, 77],
//         },
//         postalCode: {
//           format: '######',
//           regex: '^(\\d{6})$',
//         },
//       }
// }

// const mockWeatherData = {
//     state : 
//     {
//         "coord": {
//           "lon": 10.99,
//           "lat": 44.34
//         },
//         "weather": [
//           {
//             "id": 501,
//             "main": "Rain",
//             "description": "moderate rain",
//             "icon": "10d"
//           }
//         ],
//         "base": "stations",
//         "main": {
//           "temp": 298.48,
//           "feels_like": 298.74,
//           "temp_min": 297.56,
//           "temp_max": 300.05,
//           "pressure": 1015,
//           "humidity": 64,
//           "sea_level": 1015,
//           "grnd_level": 933
//         },
//         "visibility": 10000,
//         "wind": {
//           "speed": 0.62,
//           "deg": 349,
//           "gust": 1.18
//         },
//         "rain": {
//           "1h": 3.16
//         },
//         "clouds": {
//           "all": 100
//         },
//         "dt": 1661870592,
//         "sys": {
//           "type": 2,
//           "id": 2075663,
//           "country": "IT",
//           "sunrise": 1661834187,
//           "sunset": 1661882248
//         },
//         "timezone": 7200,
//         "id": 3163858,
//         "name": "Zocca",
//         "cod": 200
//       }
//     }

// Mock the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;
global.window.alert = jest.fn();

describe('CountryInfo', () => {

    it("should handle null Data", () => {
         const wrapper = shallow(
          <BrowserRouter >
            <CountryInfo />
          </BrowserRouter>
        );

        console.log(wrapper.find(CountryInfo).dive, "----------------------------============================================================");
    
        // Assert that the component renders nothing when asteroidData is null
        // const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        // expect(mockAlert).toHaveBeenCalledWith('No Data Found');

      });

    // it('should go back when the Go Back button is clicked', async () => {
    //     const wrapper = render(
    //       <MemoryRouter
    //         initialEntries={[{ pathname: "/12345", state: countryData.state }]}
    //       >
    //         <CountryInfo />
    //       </MemoryRouter>
    //     );

    //     console.log(wrapper.debug(), "----------------------------============================================================");
    
    //     // Find the Go Back button
    //     const backButton = wrapper.getByRole('button', { name: "Back" });
    //     fireEvent.click(await backButton);
    //     expect(window.location.pathname).toBe("/");
    //   })
    // it("should go back when the Go Back button is clicked", async () => {
    //     const wrapper = render(
    //       <MemoryRouter
    //         initialEntries={[{ pathname: "/countrydetails", state: countryData.state }]}
    //       >
    //         <CountryInfo />
    //       </MemoryRouter>
    //     );

    //     const countryInfoText = screen.getByText('CountryOpedia');
    //         expect(countryInfoText).toBeInTheDocument();
    
    //     // Find the Go Back button
    //     const backButton = wrapper.findByTestId("#backbutton");
    //     fireEvent.click(await backButton);
    //     expect(window.location.pathname).toBe("/");
    //   });
    
    //   it('renders "CountryOpedia" text correctly', () => {
    //     render(<MemoryRouter initialEntries={['/']} initialIndex={0}><CountryInfo location={mockLocation} /></MemoryRouter>);
    //     const countryInfoText = screen.getByText('CountryOpedia');
    //     expect(countryInfoText).toBeInTheDocument();
    //   });
});