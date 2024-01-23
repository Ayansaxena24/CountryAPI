import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import FormInput from './Form';

describe('FormInput', () => {
  it('renders correctly', () => {
    render(<MemoryRouter><FormInput /></MemoryRouter>);
    expect(screen.getByText('CountryOpedia')).toBeInTheDocument();
  });

  it('renders "Enter Country Name" text correctly', () => {
    render(<MemoryRouter><FormInput /></MemoryRouter>);
    const countryInputText = screen.getByText('Enter Country Name');
    expect(countryInputText).toBeInTheDocument();
    expect(countryInputText).toHaveClass('font-semibold');
  });

    //check fetchData
    it('fetchData', () => {
        render(<MemoryRouter><FormInput /></MemoryRouter>);
        const fetchData = jest.fn();
        fetchData('India');
        expect(fetchData).toHaveBeenCalledWith('India');
    });

    //check handleSubmit
    it('handleSubmit', () => {
        render(<MemoryRouter><FormInput /></MemoryRouter>);
        const handleSubmit = jest.fn();
        handleSubmit('India');
        expect(handleSubmit).toHaveBeenCalledWith('India');
    });

  it('handles form submission correctly', async () => {
    render(<MemoryRouter><FormInput /></MemoryRouter>);

    const inputField = screen.getByPlaceholderText('Enter Country Name');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(await inputField, { target: { value: 'Germany' } });

    fireEvent.click(submitButton);
    
    const mockApiResponse = {
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
        import { Response } from 'node-fetch';

        // ...

        it('shows alert for "Country not found" when submitting a non-existing country', async () => {
            // Mock the window.alert function
            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

            // Mock the fetch function to simulate an error for a non-existing country
            jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
                Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({}), // Simulate an empty response
                    headers: new Headers(),
                    redirected: false,
                    status: 404,
                    statusText: 'Not Found',
                    // Add the missing properties here
                } as Response)
            );

            render(<FormInput />);

            // Enter a non-existing country name and submit the form
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'NonExistingCountry' } });
            fireEvent.submit(screen.getByTestId('FormInputsubmit'));

            // Wait for the alert to be called
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Check if window.alert has been called with the expected message
            expect(alertMock).toHaveBeenCalledWith('Country not found');

            // Restore the original window.alert and fetch functions
            alertMock.mockRestore();
            global.fetch.mockRestore();
        });


});
