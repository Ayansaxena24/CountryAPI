import { shallow, configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import FormInput from "./Form";
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
        <FormInput navigate={() => {}} />
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
        <FormInput navigate={() => {}} />
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
        <FormInput navigate={() => {}} />
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
        <FormInput navigate={() => {}} />
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
        <FormInput navigate={() => {}} />
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
  
  // it("handles successful API fetch with an Input ID", async () => {
  //   const mockNavigation = { navigate: jest.fn() };
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <FormInput navigate={mockNavigation} />
  //     </BrowserRouter>
  //   );
  //   const mockApiResponse = {
  //     links: {
  //       self: "http://api.nasa.gov/neo/rest/v1/neo/2000719?api_key=n9nvcPVZxoh7ZAgFUfYlnrEF2cn7eCWeKB5dpuLI",
  //     },
  //     id: "2000719",
  //     neo_reference_id: "2000719",
  //     name: "719 Albert (A911 TB)",
  //     name_limited: "Albert",
  //     designation: "719",
  //     nasa_jpl_url:
  //       "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2000719",
  //     absolute_magnitude_h: 15.59,
  //     estimated_diameter: {
  //       kilometers: {
  //         estimated_diameter_min: 2.0256060086,
  //         estimated_diameter_max: 4.529392731,
  //       },
  //       meters: {
  //         estimated_diameter_min: 2025.6060086475,
  //         estimated_diameter_max: 4529.3927309679,
  //       },
  //       miles: {
  //         estimated_diameter_min: 1.2586528312,
  //         estimated_diameter_max: 2.8144332906,
  //       },
  //       feet: {
  //         estimated_diameter_min: 6645.6892174112,
  //         estimated_diameter_max: 14860.2128474689,
  //       },
  //     },
  //     is_potentially_hazardous_asteroid: false,
  //     close_approach_data: [
  //       {
  //         close_approach_date: "1909-08-21",
  //         close_approach_date_full: "1909-Aug-21 15:04",
  //         epoch_date_close_approach: -1904892960000,
  //         relative_velocity: {
  //           kilometers_per_second: "3.4460288884",
  //           kilometers_per_hour: "12405.7039982857",
  //           miles_per_hour: "7708.4220204903",
  //         },
  //         miss_distance: {
  //           astronomical: "1.7087741958",
  //           lunar: "664.7131621662",
  //           kilometers: "255628980.002642946",
  //           miles: "158840482.6425908148",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "1911-09-08",
  //         close_approach_date_full: "1911-Sep-08 08:15",
  //         epoch_date_close_approach: -1840290300000,
  //         relative_velocity: {
  //           kilometers_per_second: "7.1848430594",
  //           kilometers_per_hour: "25865.4350136694",
  //           miles_per_hour: "16071.7754394659",
  //         },
  //         miss_distance: {
  //           astronomical: "0.2054817569",
  //           lunar: "79.9324034341",
  //           kilometers: "30739633.156097803",
  //           miles: "19100722.3309355614",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "1941-09-08",
  //         close_approach_date_full: "1941-Sep-08 16:50",
  //         epoch_date_close_approach: -893488200000,
  //         relative_velocity: {
  //           kilometers_per_second: "7.3096055558",
  //           kilometers_per_hour: "26314.5800008612",
  //           miles_per_hour: "16350.8566677574",
  //         },
  //         miss_distance: {
  //           astronomical: "0.2056683665",
  //           lunar: "80.0049945685",
  //           kilometers: "30767549.554779355",
  //           miles: "19118068.776710899",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "1956-09-12",
  //         close_approach_date_full: "1956-Sep-12 20:20",
  //         epoch_date_close_approach: -419744400000,
  //         relative_velocity: {
  //           kilometers_per_second: "3.2634606101",
  //           kilometers_per_hour: "11748.4581964401",
  //           miles_per_hour: "7300.0350387825",
  //         },
  //         miss_distance: {
  //           astronomical: "1.4171297803",
  //           lunar: "551.2634845367",
  //           kilometers: "211999596.646447961",
  //           miles: "131730440.9343894218",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "1971-09-06",
  //         close_approach_date_full: "1971-Sep-06 04:03",
  //         epoch_date_close_approach: 52977780000,
  //         relative_velocity: {
  //           kilometers_per_second: "7.6655656184",
  //           kilometers_per_hour: "27596.0362262393",
  //           miles_per_hour: "17147.1037317985",
  //         },
  //         miss_distance: {
  //           astronomical: "0.314750247",
  //           lunar: "122.437846083",
  //           kilometers: "47085966.53317389",
  //           miles: "29257862.898584082",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "2001-09-05",
  //         close_approach_date_full: "2001-Sep-05 00:40",
  //         epoch_date_close_approach: 999650400000,
  //         relative_velocity: {
  //           kilometers_per_second: "7.6532215974",
  //           kilometers_per_hour: "27551.597750747",
  //           miles_per_hour: "17119.4913912906",
  //         },
  //         miss_distance: {
  //           astronomical: "0.2846489959",
  //           lunar: "110.7284594051",
  //           kilometers: "42582883.484278733",
  //           miles: "26459776.8409751954",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "2003-10-26",
  //         close_approach_date_full: "2003-Oct-26 03:46",
  //         epoch_date_close_approach: 1067139960000,
  //         relative_velocity: {
  //           kilometers_per_second: "3.7241284245",
  //           kilometers_per_hour: "13406.8623280875",
  //           miles_per_hour: "8330.5028726942",
  //         },
  //         miss_distance: {
  //           astronomical: "1.4865987631",
  //           lunar: "578.2869188459",
  //           kilometers: "222392008.504394597",
  //           miles: "138187986.2225635586",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "2048-09-19",
  //         close_approach_date_full: "2048-Sep-19 10:28",
  //         epoch_date_close_approach: 2484124080000,
  //         relative_velocity: {
  //           kilometers_per_second: "13.0394481682",
  //           kilometers_per_hour: "46942.0134056168",
  //           miles_per_hour: "29167.9416075068",
  //         },
  //         miss_distance: {
  //           astronomical: "0.4256632783",
  //           lunar: "165.5830152587",
  //           kilometers: "63678319.770897221",
  //           miles: "39567873.1189788098",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "2050-11-15",
  //         close_approach_date_full: "2050-Nov-15 11:59",
  //         epoch_date_close_approach: 2552126340000,
  //         relative_velocity: {
  //           kilometers_per_second: "5.0048425446",
  //           kilometers_per_hour: "18017.4331604254",
  //           miles_per_hour: "11195.3322879321",
  //         },
  //         miss_distance: {
  //           astronomical: "1.9591584158",
  //           lunar: "762.1126237462",
  //           kilometers: "293085925.996254346",
  //           miles: "182115149.6223721348",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "2063-10-10",
  //         close_approach_date_full: "2063-Oct-10 19:16",
  //         epoch_date_close_approach: 2959269360000,
  //         relative_velocity: {
  //           kilometers_per_second: "3.4163448401",
  //           kilometers_per_hour: "12298.8414242985",
  //           miles_per_hour: "7642.0217727815",
  //         },
  //         miss_distance: {
  //           astronomical: "1.5638259851",
  //           lunar: "608.3283082039",
  //           kilometers: "233945036.421611737",
  //           miles: "145366704.8887144906",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "2078-09-10",
  //         close_approach_date_full: "2078-Sep-10 05:26",
  //         epoch_date_close_approach: 3430013160000,
  //         relative_velocity: {
  //           kilometers_per_second: "7.5222547794",
  //           kilometers_per_hour: "27080.1172056678",
  //           miles_per_hour: "16826.5317159329",
  //         },
  //         miss_distance: {
  //           astronomical: "0.2134596057",
  //           lunar: "83.0357866173",
  //           kilometers: "31933102.343759859",
  //           miles: "19842309.6962856942",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "2108-09-07",
  //         close_approach_date_full: "2108-Sep-07 18:36",
  //         epoch_date_close_approach: 4376486160000,
  //         relative_velocity: {
  //           kilometers_per_second: "7.8186887298",
  //           kilometers_per_hour: "28147.2794272536",
  //           miles_per_hour: "17489.6248196732",
  //         },
  //         miss_distance: {
  //           astronomical: "0.2568612334",
  //           lunar: "99.9190197926",
  //           kilometers: "38425893.402212858",
  //           miles: "23876742.9808511204",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "2110-11-08",
  //         close_approach_date_full: "2110-Nov-08 03:30",
  //         epoch_date_close_approach: 4444860600000,
  //         relative_velocity: {
  //           kilometers_per_second: "3.4670014112",
  //           kilometers_per_hour: "12481.205080475",
  //           miles_per_hour: "7755.3354568096",
  //         },
  //         miss_distance: {
  //           astronomical: "1.3899546809",
  //           lunar: "540.6923708701",
  //           kilometers: "207934259.659169683",
  //           miles: "129204357.6665323054",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "2138-09-08",
  //         close_approach_date_full: "2138-Sep-08 23:41",
  //         epoch_date_close_approach: 5323275660000,
  //         relative_velocity: {
  //           kilometers_per_second: "8.6062194755",
  //           kilometers_per_hour: "30982.3901117826",
  //           miles_per_hour: "19251.2523447351",
  //         },
  //         miss_distance: {
  //           astronomical: "0.3677623304",
  //           lunar: "143.0595465256",
  //           kilometers: "55016461.294076248",
  //           miles: "34185643.8387703024",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //       {
  //         close_approach_date: "2157-12-03",
  //         close_approach_date_full: "2157-Dec-03 17:48",
  //         epoch_date_close_approach: 5930300880000,
  //         relative_velocity: {
  //           kilometers_per_second: "4.2458306433",
  //           kilometers_per_hour: "15284.9903160505",
  //           miles_per_hour: "9497.4985661037",
  //         },
  //         miss_distance: {
  //           astronomical: "1.6444271043",
  //           lunar: "639.6821435727",
  //           kilometers: "246002792.173547841",
  //           miles: "152859046.8884525658",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "2170-11-10",
  //         close_approach_date_full: "2170-Nov-10 05:57",
  //         epoch_date_close_approach: 6338498220000,
  //         relative_velocity: {
  //           kilometers_per_second: "3.7527965564",
  //           kilometers_per_hour: "13510.0676031391",
  //           miles_per_hour: "8394.6306170727",
  //         },
  //         miss_distance: {
  //           astronomical: "1.8228425765",
  //           lunar: "709.0857622585",
  //           kilometers: "272693366.789712055",
  //           miles: "169443800.909674159",
  //         },
  //         orbiting_body: "Juptr",
  //       },
  //       {
  //         close_approach_date: "2185-09-13",
  //         close_approach_date_full: "2185-Sep-13 19:01",
  //         epoch_date_close_approach: 6806919660000,
  //         relative_velocity: {
  //           kilometers_per_second: "8.317376111",
  //           kilometers_per_hour: "29942.553999585",
  //           miles_per_hour: "18605.1386226865",
  //         },
  //         miss_distance: {
  //           astronomical: "0.2200717869",
  //           lunar: "85.6079251041",
  //           kilometers: "32922270.567333903",
  //           miles: "20456950.3291497414",
  //         },
  //         orbiting_body: "Earth",
  //       },
  //     ],
  //     orbital_data: {
  //       orbit_id: "264",
  //       orbit_determination_date: "2024-01-14 06:22:37",
  //       first_observation_date: "1911-10-04",
  //       last_observation_date: "2024-01-13",
  //       data_arc_in_days: 41009,
  //       observations_used: 2066,
  //       orbit_uncertainty: "0",
  //       minimum_orbit_intersection: ".200752",
  //       jupiter_tisserand_invariant: "3.141",
  //       epoch_osculation: "2460200.5",
  //       eccentricity: ".5469896245444799",
  //       semi_major_axis: "2.636410361101917",
  //       inclination: "11.57585330492055",
  //       ascending_node_longitude: "183.8538970860214",
  //       orbital_period: "1563.572204811226",
  //       perihelion_distance: "1.194321247537603",
  //       perihelion_argument: "156.2302170068093",
  //       aphelion_distance: "4.078499474666232",
  //       perihelion_time: "2459955.999515030552",
  //       mean_anomaly: "56.29428197697338",
  //       mean_motion: ".2302420053850111",
  //       equinox: "J2000",
  //       orbit_class: {
  //         orbit_class_type: "AMO",
  //         orbit_class_description:
  //           "Near-Earth asteroid orbits similar to that of 1221 Amor",
  //         orbit_class_range: "1.017 AU < q (perihelion) < 1.3 AU",
  //       },
  //     },
  //     is_sentry_object: false,
  //   };

  //   const instance = wrapper.find("FormInput").instance() as any;

  //   global.fetch = jest.fn().mockImplementation(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve(mockApiResponse),
  //     })
  //   );

  //   act(() => {
  //     wrapper.find("input").props().value="2000719"
  //   });

  //   console.log(wrapper.find("input").props(), "input value");

  //   const submitbutton = wrapper.find("button#submitbutton");
  //   await act(async () => {
  //     submitbutton.simulate("click");
  //   });

  //   await instance.fetchData({ id: "2000719" }); 
  //   // expect(wrapper.find('#anotherComponent').text()).toEqual('{"key":"value"}');
  //   // expect(mockNavigation).toHaveBeenCalled();
  //   const test = wrapper.find(mockNavigation.navigate);
  //   wrapper.update();
  //   expect(test).toBe("http://localhost/details");
  // });
});




