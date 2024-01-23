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
    let wrapper: any = null;

    beforeEach(() => {
        wrapper = shallow(
          <BrowserRouter>
            <Form />
          </BrowserRouter>
        );
      });

    it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
      });

    it('should render a form', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it("disables the button when input length is not 7", () => {
        const wrapper = mount(
          <BrowserRouter>
            <FormInput navigate={() => {}} />
          </BrowserRouter>
        );
    
        act(() => {
          wrapper.find("input").simulate("change", {
            target: { value: "123" },
          });
        });
    
        wrapper.update();
        expect(wrapper.find("#submitbutton").prop("disabled")).toBe(true);
      });
});