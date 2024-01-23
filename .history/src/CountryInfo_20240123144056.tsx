import { Component } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import bg from "./assets/bg.jpg";
import withRouter from "./withRouter";

class CountryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: null,
    };
  }

  getBack = () => {
    const { navigate } = this.props;
    navigate("/");
  };

  handleWeatherData = async () => {
    const { countryData } = this.props;
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

  render() {
    const { countryData } = this.props;
    const { weatherInfo } = this.state;
    const flagURL = countryData.flags.png;

    const rows = [
      { label: "CAPITAL", value: countryData.capital[0] },
      { label: "POPULATION", value: countryData.population },
      { label: "LATITUDE", value: countryData.latlng[0] },
      { label: "LONGITUDE", value: countryData.latlng[1] },
    ];

    const weatherRows = [
      { label: "TEMPERATURE", value: weatherInfo?.main.temp },
      { label: "WIND SPEED", value: weatherInfo?.wind.speed },
    ];

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
              <TableBody>
                {!weatherInfo ? (
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
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withRouter(CountryInfo);
