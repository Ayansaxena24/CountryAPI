import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormInput from './Form';
import CountryInfo from './CountryInfo';
import { Component, ReactNode } from 'react';

interface IProps {
  navigate: () => void;
 }
 
 interface IState {
  navigateAfter: number;
  redirect: boolean;
 }
 
 class App extends Component<IProps, IState> {
  
  }

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
