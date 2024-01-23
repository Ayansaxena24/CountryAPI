import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormInput from './Form';
import CountryInfo from './CountryInfo';


class App extends Component {

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
