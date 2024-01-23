
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CountryInfo from './CountryInfo';

describe('CountryInfo', () => {
  it('renders country information correctly', () => {
    const countryDetails = {
      // Mock country details here
    };

    render(
      <MemoryRouter initialEntries={['/countryinfo']} initialIndex={0}>
        <CountryInfo />
      </MemoryRouter>,
      { wrapperProps: { initialLocation: { state: countryDetails } } }
    );

    // Add assertions to check if the rendered content matches the provided country details
    expect(screen.getByText(countryDetails.name.common)).toBeInTheDocument();
    // Add more assertions based on your component structure
  });

  it('navigates back when the "Back" button is clicked', async () => {
    const history = createMemoryHistory();
    const navigateSpy = jest.spyOn(history, 'goBack');

    render(
      <Router history={history}>
        <CountryInfo />
      </Router>
    );

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  it('fetches and displays weather information when "CAPITAL WEATHER" button is clicked', async () => {
    const countryDetails = {
      // Mock country details here
    };

    render(
      <MemoryRouter initialEntries={['/countryinfo']} initialIndex={0}>
        <CountryInfo />
      </MemoryRouter>,
      { wrapperProps: { initialLocation: { state: countryDetails } } }
    );

    const fetchSpy = jest.spyOn(global, 'fetch');

    // Mock a successful API response for weather data
    const mockWeatherData = {
      // Mock weather data here
    };

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const weatherButton = screen.getByText('CAPITAL WEATHER');
    fireEvent.click(weatherButton);

    // Wait for the weather information to be displayed
    await waitFor(() => {
      expect(screen.getByText('TEMPERATURE')).toBeInTheDocument();
      expect(screen.getByText('WIND SPEED')).toBeInTheDocument();
      // Add more assertions based on your component structure
    });

    // Check that the fetch function was called with the correct URL
    expect(fetchSpy).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?lat=${countryDetails.latlng[0]}&lon=${countryDetails.latlng[1]}&appid=ba21f1fb2256fc495bceed24839bca72`
    );
  });

  // Add more test cases as needed based on your component's functionality
});
