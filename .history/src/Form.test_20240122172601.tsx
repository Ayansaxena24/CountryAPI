import { shallow, configure } from "enzyme";
import Form from "./Form";
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Form", () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.exists()).toBe(true);
      });
});