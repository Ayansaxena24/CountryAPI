import { shallow, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
// import { act } from 'react-dom/test-utils';

import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
configure({ adapter: new Adapter() });

describe("CountryInfo", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<BrowserRouter><CountryInfo /> </BrowserRouter>);
        expect(wrapper.exists()).toBe(true);
    });
});