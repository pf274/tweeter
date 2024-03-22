import { AuthToken, User } from "tweeter-shared";
import { StatusService } from "../../src/model/service/StatusService";
import "isomorphic-fetch";

const testImage =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png";

describe("StatusService tests", () => {
  let testAuthToken: AuthToken;
  let testUser: User;
  let statusService: StatusService;
  beforeAll(() => {
    testAuthToken = new AuthToken("testToken", Date.now());
    testUser = new User("Amy", "Ames", "@amy", testImage);
    statusService = new StatusService();
  });
  it("Load user's story page", async () => {
    const response = await statusService.loadMoreStoryItems(
      testAuthToken,
      testUser,
      10,
      null
    );
    expect(response).not.toBeNull();
    expect(response[0]).toBeInstanceOf(Array);
    expect(response[0].length).toBeGreaterThan(0);
    expect(response[1]).toBeDefined();
  });
});
