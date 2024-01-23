import App from "./App";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

configure({ adapter: new Adapter() });

describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});