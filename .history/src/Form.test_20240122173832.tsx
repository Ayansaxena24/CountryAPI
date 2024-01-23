import { shallow, configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Form from "./Form";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

// Mock the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;
global.window.alert = jest.fn();


describe("FormInput", () => {
  let wrapper: any = null;

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("disables the button when input length is not 7", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Form navigate={() => {}} />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find("input").simulate("change", {
        target: { value: "123" },
      });
    });

    wrapper.update();
    expect(wrapper.find("#submitbutton").prop("disabled")).toBe(true);
  });

  it("enables the button when input length is 7", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Form  />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find("input").simulate("change", {
        target: { value: "2000719" },
      });
    });

    wrapper.update();
    expect(wrapper.find("#submitbutton").prop("disabled")).toBe(false);
  });

  it("Random Asteroid Button", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Form  />
      </BrowserRouter>
    );

    const randomButton = wrapper.find("#randombutton");
    randomButton.simulate("click");
    wrapper.update();
    expect(wrapper.find("loading")).toBeTruthy();
  });

  it("displays loading component when loading state is true", () => {
    const wrapper = mount(
      <BrowserRouter>
        <FormInput navigate={() => {}} />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find("input").simulate("change", {
        target: { value: "2000719" },
      });
    });

    act(() => {
      wrapper.find("form").simulate("submit");
    });

    wrapper.update();
    expect(wrapper.find("loading")).toBeTruthy();
  });

  it('gives error when a wrong 7 digit ID is entered', async () => {
    // Mock the fetch function
    mockFetch.mockResolvedValue({
      ok: false,
    } as Response);

    // Spy on window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(
      <BrowserRouter>
        <FormInput navigate={() => {}} />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find('input').props().value="2000719"
      });

      // console.log(wrapper.find('input').props(), "input value");

    wrapper.update();
    const submitbutton = wrapper.find('button#submitbutton');
    const formsubmit = wrapper.find('form');
    await act(async () => {
      submitbutton.simulate('click');
      formsubmit.simulate('submit')

    });
    wrapper.update();

    // Check if window.alert was called with the expected message
    expect(alertSpy).toHaveBeenCalledWith('Error fetching asteroid data! Please recheck the input ID');

    // Restore all mock implementations
    jest.restoreAllMocks();
  });

  it('Testing the fetch function', async () => {
    // Mock the fetch function
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);

    const wrapper = mount(
      <BrowserRouter>
        <FormInput navigate={() => {}} />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find('input').props().value="2000719"
      });

    wrapper.update();
    const submitbutton = wrapper.find('button#submitbutton');
    const formsubmit = wrapper.find('form');
    await act(async () => {
      submitbutton.simulate('click');
      formsubmit.simulate('submit')

    });
    wrapper.update();

    // Check if window.alert was called with the expected message
    expect(mockFetch).toHaveBeenCalledWith('https://api.nasa.gov/neo/rest/v1/neo/2000719?api_key=n9nvcPVZxoh7ZAgFUfYlnrEF2cn7eCWeKB5dpuLI');

    // Restore all mock implementations
    jest.restoreAllMocks();
  })

  it('Testing the fetch function in Random Submit', async () => {
    // Mock the fetch function
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);

    const wrapper = mount(
      <BrowserRouter>
        <FormInput navigate={() => {}} />
      </BrowserRouter>
    );

    const randomButton = wrapper.find("#randombutton");
    randomButton.simulate("click");
    wrapper.update();

    // Check if window.alert was called with the expected message
    expect(mockFetch).toHaveBeenCalledWith('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=n9nvcPVZxoh7ZAgFUfYlnrEF2cn7eCWeKB5dpuLI');

    // Restore all mock implementations
    jest.restoreAllMocks();
  });

  it('if response is not okay', async () => {
    // Mock the fetch function
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    } as Response);

    // Spy on window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(
      <BrowserRouter>
        <FormInput navigate={() => {}} />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find('input').props().value="2000700"
      });

    wrapper.update();
    const submitbutton = wrapper.find('button#submitbutton');
    const formsubmit = wrapper.find('form');
    await act(async () => {
      submitbutton.simulate('click');
      formsubmit.simulate('submit')

    });
    wrapper.update();

    // Check if window.alert was called with the expected message
    expect(alertSpy).toHaveBeenCalledWith('Error fetching asteroid data! Please recheck the input ID');

    // Restore all mock implementations
    jest.restoreAllMocks();
  })

  it('if response is not okay in Random Submit', async () => {
    // Mock the fetch function
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    } as Response);

    // Spy on window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    const randomButton = wrapper.find("#randombutton");
    randomButton.simulate("click");
    wrapper.update();

    // Check if window.alert was called with the expected message
    expect(alertSpy).toHaveBeenCalledWith('Error fetching asteroid data! Please recheck the input ID');

    // Restore all mock implementations
    jest.restoreAllMocks();
  })
  
});




