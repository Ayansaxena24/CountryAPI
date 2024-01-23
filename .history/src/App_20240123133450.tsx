import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormInput from './Form';
import CountryInfo from './CountryInfo';
import { Component, ReactNode } from 'react';


class App extends Component {
  render(): ReactNode {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FormInput />} />
            <Route path="/countryinfo" element={<CountryInfo />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

}

export default App;
