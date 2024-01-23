import { shallow, configure } from "enzyme";
import Form from "./Form";
import * as Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Form", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<BrowserRouter><Form />);
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });
});