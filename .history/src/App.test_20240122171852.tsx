import App from "./App";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TextEncoder as NodeTextEncoder } from 'util';



describe("App", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
      });
});