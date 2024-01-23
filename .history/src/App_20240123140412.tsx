import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  
  constructor(props: IProps) {
    super(props);
    this.state = {
      navigateAfter: 0,
      redirect: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, this.state.navigateAfter);
 }

  render(): ReactNode {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<FormInput />} />
            <Route path="/countryinfo" element={<CountryInfo />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
