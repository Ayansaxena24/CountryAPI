import { Component, FormEvent } from 'react';
import bg from './assets/bg.jpg';
import CircularLoader from './CircularLoader';
import withRouter from './withRouter';

interface FormInputState {
  name: string;
  countryDetails: any;
  loading: boolean;
}

class FormInput extends Component <{ navigate: (str: string, any: any) => void },
FormInputState>{
  constructor(props : any) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      countryDetails: null,
    };
  }

  fetchData = async () => {
    const { name, loading } = this.state;
    if (!loading) {
      try {
        this.setState({ loading: true });
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );

        if (!res.ok) {
          throw new Error('Error Occured');
        }
        const data = await res.json();
        this.setState({ countryDetails: data });
        console.log(data);
        this.props.navigate('/countryinfo/', { state: data });
      } catch (err) {
        alert('Error Occured');
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    this.fetchData();
  };

  render() {
    const { name, countryDetails, loading } = this.state;
    return (
      <div className="flex flex-col bg-cover justify-center items-center text-white pt-24 overflow-clip bg-center w-full h-[70vh] bg-center-bottom bg-no-repeat">
        <div className="z-10 top-6 absolute">
          <p className="font-bold text-4xl ">CountryOpedia</p>
        </div>
        <img
          src={bg}
          alt="bg"
          className="z-0 absolute -top-52 right-0 w-full h-[150vh] bg-center-bottom bg-no-repeat bg-cover"
        />

        <div className="absolute w-full justify-center flex items-center ">
          {countryDetails === null && (
            <div className="flex z-10 justify-center w-screen right-[50%] left-[50%] items-center h-[100vh] absolute">
              <form
                id="FormInputsubmit"
                onSubmit={this.handleSubmit}
                className="z-10 border-2 rounded-md pb-8 px-8 pt-4 space-y-2 backdrop-filter backdrop-blur-md bg-opacity-60"
              >
                <div className="flex justify-center items-center w-full pr-4">
                  <p className="font-bold text-2xl">Input Country Details</p>
                </div>
                <div className="flex space-x-2">
                  <p id="countryinputtext" className="font-semibold">
                    Enter Country Name
                  </p>
                  <input
                    type="text"
                    className="bg-black pl-2 bg-opacity-60 backdrop-blur-lg border-2 rounded-md"
                    value={name}
                    name="input-field"
                    placeholder="Enter Country Name"
                    id="input-field"
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  {loading ? (
                    <div
                      id="loading"
                      data-testid="loading"
                      className="flex justify-center items-center"
                    >
                      <CircularLoader />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center items-center w-full pt-4 z-10">
                        <button
                          disabled={!name.trim()} // Use trim to remove leading and trailing spaces
                          id="submitbutton"
                          className={`${
                            this.state.name.trim() !== ''
                              ? 'border-2 border-white rounded-md px-2 duration-300 ease-in-out transition-transFormInput hover:scale-110'
                              : 'border-2 border-gray-400 rounded-md duration-300 ease-in-out px-2 text-gray-500 hover:border-gray-400 cursor-not-allowed'
                          }`}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(FormInput);
