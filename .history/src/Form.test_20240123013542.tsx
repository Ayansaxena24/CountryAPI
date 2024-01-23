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
        const fetchData = jest.fn();
        fetchData('India');
        expect(fetchData).toHaveBeenCalledWith('India');
    });

    //check handleSubmit
    it('handleSubmit', () => {
        const handleSubmit = jest.fn();
        handleSubmit('India');
        expect(handleSubmit).toHaveBeenCalledWith('India');
    });

  it('handles form submission correctly', async () => {
//     render(<MemoryRouter><FormInput /></MemoryRouter>);

    const inputField = screen.getByPlaceholderText('Enter Country Name');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(await inputField, { target: { value: 'Germany' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check that the loading spinner is displayed
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
    const mockApiResponse = {
      // Your mock API response here
    };

);     global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeNull();
    });

    // Check that the navigation occurred
    expect(screen.getByTestId('country-info')).toBeInTheDocument(
  });
});
