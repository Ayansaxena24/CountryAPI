import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    await waitFor(() => {
      // Check that the loading spinner is displayed
      expect(screen.getByTestId('')).toBeInTheDocument();
    });
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

     global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeNull();
    });

    // Check that the navigation occurred
    expect(screen.getByTestId('country-info')).toBeInTheDocument();
  });
});
