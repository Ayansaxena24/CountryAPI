import { shallow, configure } from "enzyme";
import Form from "./Form";
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { BrowserRouter } from "react-router-dom";

// Mock the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;
global.window.alert = jest.fn();

describe("Form", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.exists()).toBe(true);
      });
});