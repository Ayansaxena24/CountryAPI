import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './Form';
import CountryInfo from './CountryInfo';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/countryinfo" element={<CountryInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
