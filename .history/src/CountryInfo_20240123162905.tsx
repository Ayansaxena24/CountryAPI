import { Component } from "react";
// import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import bg from "./assets/bg.jpg";
import withRouter from "./withRouter";

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
    '2011': number;
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
    format: string;
    regex: string;
  };
}

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface CountryInfoState {
  weatherInfo: WeatherData;
  countryData: CountryDetails ;
}

interface CountryInfoProps {
  location: any;
}

class CountryInfo extends Component<CountryInfoProps, CountryInfoState> {
  constructor(props: CountryInfoProps) {
    super(props);

    this.state = {
      weatherInfo: {"coord":{"lon":0,"lat":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":300.63,"feels_like":299.57,"temp_min":300.63,"temp_max":300.63,"pressure":1011,"humidity":21,"sea_level":1011,"grnd_level":957},"visibility":10000,"wind":{"speed":3.72,"deg":327,"gust":3.91},"clouds":{"all":60},"dt":1706007255,"sys":{"country":"IN","sunrise":1705973369,"sunset":1706013444},"timezone":19800,"id":1269750,"name":"India","cod":200},
    };
  }

  getBack = () => {
    window.location.href = "/";
  };

  handleWeatherData = async () => {
    const { countryData } = this.state;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countryData.latlng[0]}&lon=${countryData.latlng[1]}&appid=ba21f1fb2256fc495bceed24839bca72`
      );
      const data = await res.json();
      this.setState({ weatherInfo: data });
    } catch (err) {
      alert("Error Occurred");
    }
  };

  componentDidMount() {
    const location = this.props.location;
    const countryDetails = location.state;
    this.setState({ countryData: countryDetails });
  }


  render() {
    const weatherInfo
    const location = this.props.location;
    const countryDetails = location.state;
    console.log(weatherInfo, "weatherInfo");
    const countryData = countryDetails[0];
    const flagURL = countryData.flags.png;

    const rows = [
      { label: "CAPITAL", value: countryData.capital[0] },
      { label: "POPULATION", value: countryData.population },
      { label: "LATITUDE", value: countryData.latlng[0] },
      { label: "LONGITUDE", value: countryData.latlng[1] },
    ];

    // const weatherRows = [
    //   { label: "TEMPERATURE", value: weatherInfo?.main.temp },
    //   { label: "WIND SPEED", value: weatherInfo?.wind.speed },
    // ];

    return (
      <div className="flex flex-col bg-cover justify-center items-center text-white pt-24 overflow-hidden bg-center w-screen h-[screen] bg-center-bottom bg-no-repeat">
        <img
          src={bg}
          alt="bg"
          className="z-0 absolute -top-52 right-0 w-full h-[150vh] bg-center-bottom bg-no-repeat bg-cover "
        />

        <div className="mt-4 p-4 border-2 rounded-md z-20 overflow-auto left-[50%] right-[50%] absolute w-[100vh] top-20 bg-opacity-70 bg-black ">
          <div className="flex justify-between mb-4">
            <div className="z-10 absolute top-4 flex space-x-3">
              <p className="font-bold text-4xl z-10">{countryData.name.common}</p>
              <img src={flagURL} alt="flag" className="h-[5vh] mt-1" />
            </div>
            <div className="w-full flex justify-end">
              <button
                className="bg-transparent border-2 rounded-md border-white px-2 py-1 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={this.getBack}
                name="Back"
                id="backbutton"
              >
                Back
              </button>
            </div>
          </div>

          <TableContainer
            component={Paper}
            style={{ background: "rgba(0, 0, 0, 0.1)", color: "white" }}
            className="z-10"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "white" }} align="left">
                    Property
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="left">
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell
                      style={{ color: "white" }}
                      component="th"
                      scope="row"
                    >
                      {row.label}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableBody>
                {weatherInfo === null ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="center"
                      className="space-x-4"
                    >
                      <Button
                        id="capital"
                        variant="outlined"
                        sx={{ borderColor: "white", color: "white" }}
                        onClick={this.handleWeatherData}
                      >
                        CAPITAL WEATHER
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {weatherRows.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell
                          style={{ color: "white" }}
                          component="th"
                          scope="row"
                        >
                          {row.label}
                        </TableCell>
                        <TableCell style={{ color: "white" }} align="left">
                          {row.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody> */}
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withRouter(CountryInfo);
