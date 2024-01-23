import { BrowserRouter, Routes, Route } from 'react-router-dom';
import For
import CountryInfo from './CountryInfo';


function App() {

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

export default App;
