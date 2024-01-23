import { render } from "@testing-library/react";
import CountryInfo from "./CountryInfo";
import { MemoryRouter } from 'react-router-dom';

describe('CountryInfo', () => {
    it('renders correctly', () => {
        render(<MemoryRouter><CountryInfo /></MemoryRouter>);
    });
});