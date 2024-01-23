import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
import bg from "./assets/bg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";

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

const CountryInfo = () => {
  const location = useLocation();
  const countryDetails = location.state;
  const countryData : CountryDetails = countryDetails ? countryDetails[0] : null;
  // const [loading, setLoading] = useState(false);
  console.log("countryData -->", countryData);
  const flagURL = countryData ? countryData.flags.png : "";
  const [weatherInfo, setWeatherInfo] = useState(null as any);
  console.log("flagURL -->", flagURL);
  const navigate = useNavigate();

  

  const rows = [
    { label: "CAPITAL", value: countryData.capital[0] },
    { label: "POPULATION", value: countryData.population },
    { label: "LATITUDE", value: countryData.latlng[0] },
    { label: "LONGITUDE", value: countryData.latlng[1] },
  ];


  const getBack = () => {
    navigate("/");
    window.location.reload();
  };

  const tempWeatherData : WeatherData = 
    {
        "coord": {
          "lon": 10.99,
          "lat": 44.34
        },
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 298.48,
          "feels_like": 298.74,
          "temp_min": 297.56,
          "temp_max": 300.05,
          "pressure": 1015,
          "humidity": 64,
          "sea_level": 1015,
          "grnd_level": 933
        },
        "visibility": 10000,
        "wind": {
          "speed": 0.62,
          "deg": 349,
          "gust": 1.18
        },
        "rain": {
          "1h": 3.16
        },
        "clouds": {
          "all": 100
        },
        "dt": 1661870592,
        "sys": {
          "type": 2,
          "id": 2075663,
          "country": "IT",
          "sunrise": 1661834187,
          "sunset": 1661882248
        },
        "timezone": 7200,
        "id": 3163858,
        "name": "Zocca",
        "cod": 200
      } 

      const weatherRows = [
        { label: "TEMPERATURE", value: tempWeatherData.main.temp },
        { label: "WIND SPEED", value: tempWeatherData.wind.speed }
      ]

  const handleWeatherData = async () => {
    // setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countryData.latlng[0]}&lon=${countryData.latlng[1]}&appid=ba21f1fb2256fc495bceed24839bca72`
      );
      // const res : WeatherData = tempWeatherData;
      const data : WeatherData = await res.json();
    // const data : WeatherData = res;
      setWeatherInfo(data);
      console.log(data, "weatherInfo");
    } catch (err) {
      console.log(err);
      alert("Error Occured");
    } finally {
      // setLoading(false);
    }
  };

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
                onClick={getBack}>
                  id = "backbutton"
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
            <TableBody>
              {!weatherInfo ? (
                <TableRow>
                  <TableCell colSpan={2} align="center" className="space-x-4">
                    <Button variant="outlined" sx={{borderColor : "white", color : "white"}} onClick={handleWeatherData}>
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
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CountryInfo;
