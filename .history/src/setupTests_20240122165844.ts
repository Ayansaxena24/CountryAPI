// src/setupTests.ts
// import '@testing-library/jest-dom';
import 'babel-jest'
// src/setupTests.ts
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

configure({ adapter: new Adapter() });