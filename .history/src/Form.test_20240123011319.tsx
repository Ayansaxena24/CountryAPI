import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('handles form submission correctly', async () => {
    render(<MemoryRouter><FormInput /></MemoryRouter>);

    const inputField = screen.getByLabelText("name") as HTMLInputElement;
    const submitButton = screen.getByText('Submit');

    // Type a country name in the input field
    fireEvent.change(inputField, { target: { value: 'Germany' } });

    // Trigger form submission
    fireEvent.click(submitButton);

    // Wait for the fetch to complete
    await waitFor(() => {
      // Check that the loading spinner is displayed
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    // Simulate a successful response from the API
    const mockApiResponse = {
      // Your mock API response here
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
