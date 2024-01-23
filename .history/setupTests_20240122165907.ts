// src/setupTests.ts
// import '@testing-library/jest-dom';
import 'babel-jest'
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecode