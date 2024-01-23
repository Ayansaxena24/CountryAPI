import App from "./App";
import { shallow, configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { TextEncoder as NodeTextEncoder } from 'util';

type TextEncoderType = {
  new (): NodeTextEncoder;
  prototype: NodeTextEncoder;
};


configure({ adapter: new Adapter() });

global.TextEncoder = TextEncoder;

describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});