import { shallow, configure } from "enzyme";
import CircularIndeterminate from "./CircularLoader";

import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("CircularIndeterminate", () => {
    