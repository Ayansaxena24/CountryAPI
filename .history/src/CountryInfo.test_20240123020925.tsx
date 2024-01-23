import { render, screen } from "@testing-library/react";
import CountryInfo from "./CountryInfo";
import { MemoryRouter } from 'react-router-dom';

describe('CountryInfo', () => {
    it('renders correctly', () => {
        render(<MemoryRouter><CountryInfo /></MemoryRouter>);
    });

    it('renders "CountryOpedia" text correctly', () => {
        render(<MemoryRouter><CountryInfo /></MemoryRouter>);
        const countryInfoText = screen.('CountryOpedia');
        expect(countryInfoText).toBeInTheDocument();
        expect(countryInfoText).toHaveClass('font-semibold');
    });
});