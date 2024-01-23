import App from "./App";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecode

configure({ adapter: new Adapter() });

describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});