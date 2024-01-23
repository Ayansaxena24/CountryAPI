import { shallow, configure } from "enzyme";
import Form from "./Form";
import * as Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Form", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Form />);
    console.log(wrapper.debug());
    expect(component).toMatchSnapshot();
  });
});