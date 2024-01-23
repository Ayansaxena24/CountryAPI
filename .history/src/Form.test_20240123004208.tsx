import { shallow, configure } from "enzyme";
import Form from "./Form";
import * as Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Form", () => {
  it("should render correctly", () => {
    const component = shallow(<Form />);
    console.log(component.debug());
    expect(component).toMatchSnapshot();
  });
});