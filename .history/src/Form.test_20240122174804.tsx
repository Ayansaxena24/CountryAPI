import { configure, mount, shallow } from "enzyme";
import Form from "./Form";
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Mock the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;
global.window.alert = jest.fn();

describe("Form", () => {

    it('renders without crashing', () => {
        const wrapper = shallow(
            <BrowserRouter>
              <Form  />
            </BrowserRouter>
          );
        expect(wrapper.exists()).toBe(true);
      });

    it("disables the button when input length is 0", () => {
        const wrapper = shallow(
          <BrowserRouter>
            <Form  />
          </BrowserRouter>
        );
    
        act(() => {
          wrapper.find("#input").simulate("change", {
            target: { value: "" },
          });
        });
    
        wrapper.update();
        expect(wrapper.find("#submitbutton").prop("disabled")).toBe(true);
      });
});