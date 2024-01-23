import App from "./App";
import { shallow, configure } from "enzyme";
import <Adaper></Adaper>


describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});