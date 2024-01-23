import { render } from 'enzyme';
// import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Form from './Form';
// import { act } from 'react-dom/test-utils';

// Mock the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Form', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
    console.log(wrapper, "wrapper check")
    expect(wrapper.exists()).toBe(true);
  });

//   it('disables the button when input length is 0', () => {
//     const wrapper = shallow(
//       <BrowserRouter>
//         <Form />
//       </BrowserRouter>
//     );

//     act(() => {
//       wrapper.find('#inputfield').simulate('change', {
//         target: { value: '' },
//       });
//     });

//     console.log(wrapper.debug(), 'kjlasgfasuipgfaep9uvghadsu9p[beu9[vewh-g9qeuhvbeda9-uvhqe-9vew');

//     wrapper.update();
//     expect(wrapper.find('#submitbutton').prop('disabled')).toBe(true);
//   });

//   it('enables the button when input length is greater than 0', () => {
//     const wrapper = mount(
//       <BrowserRouter>
//         <Form />
//       </BrowserRouter>
//     );

//     act(() => {
//       wrapper.find('#inputfield').simulate('change', {
//         target: { value: 'Country' },
//       });
//     });

//     wrapper.update();
//     expect(wrapper.find('#submitbutton').prop('disabled')).toBe(false);
//   });

//   it('calls fetchData on form submission', async () => {
//     const wrapper = shallow(
//       <BrowserRouter>
//         <Form />
//       </BrowserRouter>
//     );

//     await act(async () => {
//       wrapper.find('input').simulate('change', {
//         target: { value: 'india' },
//       });
//       wrapper.find('#formsubmit').simulate('submit');
//     });

//     expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/v3.1/name/Country?fullText=true'));
//   });

});
