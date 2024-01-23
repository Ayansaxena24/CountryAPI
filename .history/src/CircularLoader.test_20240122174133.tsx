import { shallow, configure } from "enzyme";
import CircularIndeterminate from "./CircularLoader";

import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("CircularIndeterminate", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CircularIndeterminate />);
        expect(wrapper.exists()).toBe(true);
      });

    it("renders a circular loader", () => {
        const wrapper = shallow(<CircularpProgress />);
        expect(wrapper.find("#circularloader").exists()).toBe(true);
      });
});