import { configure, mount, render } from "enzyme";
import Form from "./Form";
import * as Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Form", () => {
  it("should render correctly", () => {
    const wrapper = render(<MemoryRouter><Form /></MemoryRouter>);
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });
});