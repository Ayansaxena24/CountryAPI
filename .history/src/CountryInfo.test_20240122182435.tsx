import { shallow, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import { act } from 'react-dom/test-utils';

import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("CountryInfo", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<CountryInfo />);
        expect(wrapper.exists()).toBe(true);
    });
});