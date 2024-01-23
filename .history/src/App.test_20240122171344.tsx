import App from "./App";
import { shallow, configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});