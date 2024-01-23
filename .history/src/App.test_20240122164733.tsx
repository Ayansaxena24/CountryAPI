import App from "./App";
import { shallow } from "enzyme";

import * as Adapter from "enzyme-adapter-react-16";

import { configure } from "enzyme";

configure({ adapter: new adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});