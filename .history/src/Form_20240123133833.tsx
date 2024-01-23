import bg from "./assets/bg.jpg";
import CircularLoader from "./CircularLoader";
import { useState } from "react";
import rea
import { useNavigate } from "react-router-dom";
import Component from "react";

interface CountryDetails {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
      hin: {
        official: string;
        common: string;
      };
      tam: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    INR: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    eng: string;
    hin: string;
    tam: string;
  };
  translations: {
    ara: {
      official: string;
      common: string;
    };
    // Add translations for other languages as needed
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
    // Add demonyms for other languages as needed
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: {
    "2011": number;
  };
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: {
    FormInputat: string;
    regex: string;
  };
}

interface FormInputState {
  name: string;
  countryDetails: CountryDetails | null;
  loading: boolean;
}



class FormInput extends Component<
  { navigate: (str: string, any: any) => void },
  FormInputState
> {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(
    null
  );
  const navigate = useNavigate();

  const fetchData = async (name: string) => {
    if (!loading){
    try {
      setLoading(true);
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );

      const data = await res.json();
      setCountryDetails(data);
      // console.log(data);
      navigate("/countryinfo/", { state: data });
    } catch (err) {
      //  console.log(err);
      alert("Error Occured");
      setLoading(false);
    } finally {
    }
  }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData(name);
  };

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
              onSubmit={handleSubmit}
              className="z-10 border-2 rounded-md pb-8 px-8 pt-4 space-y-2 backdrop-filter backdrop-blur-md bg-opacity-60"
            >
              <div className="flex justify-center items-center w-full pr-4">
                <p className="font-bold text-2xl">Input Country Details</p>
              </div>
              <div className="flex space-x-2">
                <p id="countryinputtext" className="font-semibold">Enter Country Name</p>
                <input
                  type="text"
                  className="bg-black pl-2 bg-opacity-60 backdrop-blur-lg border-2 rounded-md"
                  value={name}
                  name = "input-field"
                  placeholder="Enter Country Name"
                  id="input-field"
                  onChange={(e) => {
                    setName(e.target.value);
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
                          name.trim() !== ""
                            ? "border-2 border-white rounded-md px-2 duration-300 ease-in-out transition-transFormInput hover:scale-110"
                            : "border-2 border-gray-400 rounded-md duration-300 ease-in-out px-2 text-gray-500 hover:border-gray-400 cursor-not-allowed"
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
};

export default FormInput;
