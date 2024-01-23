import { act, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import CountryInfo from "./CountryInfo";
import { MemoryRouter } from 'react-router-dom';

const mockWeatherData = {
    state : 
    {
        "coord": {
          "lon": 10.99,
          "lat": 44.34
        },
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 298.48,
          "feels_like": 298.74,
          "temp_min": 297.56,
          "temp_max": 300.05,
          "pressure": 1015,
          "humidity": 64,
          "sea_level": 1015,
          "grnd_level": 933
        },
        "visibility": 10000,
        "wind": {
          "speed": 0.62,
          "deg": 349,
          "gust": 1.18
        },
        "rain": {
          "1h": 3.16
        },
        "clouds": {
          "all": 100
        },
        "dt": 1661870592,
        "sys": {
          "type": 2,
          "id": 2075663,
          "country": "IT",
          "sunrise": 1661834187,
          "sunset": 1661882248
        },
        "timezone": 7200,
        "id": 3163858,
        "name": "Zocca",
        "cod": 200
      }
    }

describe('CountryInfo', () => {

    it("should go back when the Go Back button is clicked", () => {
        const wrapper = render(
          <MemoryRouter
            initialEntries={[{ pathname: "/1234567", state: mockWeatherData.state }]}
          >
            <CountryInfo />
          </MemoryRouter>
        );
    
        // console.log(wrapper.find("#heading").length, "testing heading ---------------------------------------------------")
    
        // Find the Go Back button
        const backButton = wrapper.findByText("Back");
    
        await fireEvent.click(backButton);
    
        // Assert that the window location pathname is "/"
        expect(window.location.pathname).toBe("/");
      });
    
    //   it('renders "CountryOpedia" text correctly', () => {
    //     render(<MemoryRouter initialEntries={['/']} initialIndex={0}><CountryInfo location={mockLocation} /></MemoryRouter>);
    //     const countryInfoText = screen.getByText('CountryOpedia');
    //     expect(countryInfoText).toBeInTheDocument();
    //   });
});