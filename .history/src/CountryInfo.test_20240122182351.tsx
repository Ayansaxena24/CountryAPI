import { shallow, configure } from "enzyme";
import CountryInfo from "./CountryInfo";
import { act } from "react-router-dom";

describe("CountryInfo", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<CountryInfo />);
        expect(wrapper.exists()).toBe(true);
    });
)})