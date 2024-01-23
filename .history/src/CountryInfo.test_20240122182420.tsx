import { shallow } from "enzyme";
import CountryInfo from "./CountryInfo";
import { act } from 'react-dom/test-utils';

describe("CountryInfo", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<CountryInfo />);
        expect(wrapper.exists()).toBe(true);
    });
});