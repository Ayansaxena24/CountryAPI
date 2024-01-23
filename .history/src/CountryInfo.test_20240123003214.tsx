import { shallow, render, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
configure({ adapter: new Adapter() });



describe("CountryInfo", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BrowserRouter><CountryInfo /></BrowserRouter>);
    expect(wrapper.exists()).toBe(true);
  });

  it('puts mockData as target value and checks then' , () => {
    const wrapper = shallow(<BrowserRouter><CountryInfo /></BrowserRouter>);
    const input = wrapper.find('#inputfield');
    input.simulate('change', {target: {value: 'India'}});
    expect(input.prop('value')).toBe('India');
  });
});


