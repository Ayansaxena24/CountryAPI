import App from "./App";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TextEncoder as NodeTextEncoder } from 'util';

type TextEncoderType = {
  new (): NodeTextEncoder;
  prototype: NodeTextEncoder;
};

global.TextEncoder = NodeTextEncoder as TextEncoderType;
configure({ adapter: new Adapter() });


describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});