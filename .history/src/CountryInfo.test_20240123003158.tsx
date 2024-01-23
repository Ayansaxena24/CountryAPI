import { shallow, render, mount, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

const mockData = {
  // ... (your mock data)
};

describe("CountryInfo", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BrowserRouter><CountryInfo /></BrowserRouter>);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the table rows correctly", () => {
    const wrapper = shallow(<CountryInfo />);
    const rows = wrapper.find('TableRow');
    expect(rows).toHaveLength(4); // Assuming there are four rows in your component
  });

  it("displays the country name and flag", () => {
    const wrapper = shallow(<CountryInfo />);
    wrapper.setState({ countryData: mockData }); // Assuming you use local state to store countryData
    const countryName = wrapper.find('p.font-bold.text-4xl');
    const flagImage = wrapper.find('img');
    expect(countryName.text()).toBe(mockData.name.common);
    expect(flagImage.prop('src')).toBe(mockData.flags.png);
  });

  it("handles 'Back' button click correctly", () => {
    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigateMock,
    }));
    
    const wrapper = shallow(<CountryInfo />);
    const backButton = wrapper.find('button');
    backButton.simulate('click');
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("displays 'CAPITAL WEATHER' button when weatherInfo is null", () => {
    const wrapper = shallow(<CountryInfo />);
    wrapper.setState({ weatherInfo: null });
    const weatherButton = wrapper.find('Button');
    expect(weatherButton.exists()).toBe(true);
    expect(weatherButton.text()).toBe('CAPITAL WEATHER');
  });

  it("displays weather information when weatherInfo is available", async () => {
    const mockWeatherData = {
      main: { temp: 25, feels_like: 22 },
      wind: { speed: 5 },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    const wrapper = mount(<CountryInfo />);
    await act(async () => {
      await wrapper.find('Button').simulate('click');
    });

    wrapper.update();

    const temperatureCell = wrapper.findWhere(
      (node) => node.type() === 'td' && node.text() === 'TEMPERATURE'
    );
    const windSpeedCell = wrapper.findWhere(
      (node) => node.type() === 'td' && node.text() === 'WIND SPEED'
    );

    expect(temperatureCell.next().text()).toBe(`${mockWeatherData.main.temp}`);
    expect(windSpeedCell.next().text()).toBe(`${mockWeatherData.wind.speed}`);
  });
});
