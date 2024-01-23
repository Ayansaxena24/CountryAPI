import { shallow, render, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
configure({ adapter: new Adapter() });

const mockData = {
  // ... (your mock data)
};

describe("CountryInfo", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BrowserRouter><CountryInfo /></BrowserRouter>);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the table", () => {
    const wrapper = render(<BrowserRouter><CountryInfo /></BrowserRouter>);
    expect(wrapper.find("Table")).toHaveLength(1);
  });
});


