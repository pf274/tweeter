import { AuthToken, User } from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import "isomorphic-fetch";

const testImage =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png";

describe("Server tests", () => {
  let testAuthToken: AuthToken;
  let testUser: User;
  beforeAll(() => {
    testAuthToken = new AuthToken("testToken", Date.now());
    testUser = new User("Amy", "Ames", "@amy", testImage);
  });
  test("ServerFacade.getUserByAlias", async () => {
    console.log(JSON.stringify(testAuthToken.dto));
    const response = await ServerFacade.getUserByAlias({
      authToken: testAuthToken.dto,
      alias: testUser.alias,
    });
    expect(response.user).not.toBeNull();
    expect(response.user!.alias).toBe(testUser.alias);
  });
  test("ServerFacade.register", async () => {
    const imageBytes: Uint8Array = new Uint8Array(0);
    const imageStringBase64 = Buffer.from(imageBytes).toString("base64");
    const response = await ServerFacade.register({
      firstName: "Test",
      lastName: "User",
      alias: "@test",
      password: "password",
      imageStringBase64: imageStringBase64,
    });
    expect(response.user).not.toBeNull();
    expect(response.authToken).not.toBeNull();
  });
  test("ServerFacade.getFollowers", async () => {
    const response = await ServerFacade.getFollowers({
      authToken: testAuthToken.dto,
      user: testUser.dto,
      lastItem: null,
      pageSize: 10,
    });
    expect(response.users).toBeInstanceOf(Array);
    expect(response.users.length).toBeGreaterThan(0);
    expect(response.hasMore).toBeDefined();
  });
  test("ServerFacade.getFollowersCount", async () => {
    const response = await ServerFacade.getFollowersCount({
      authToken: testAuthToken.dto,
      user: testUser.dto,
    });
    expect(response).toBeDefined();
    expect(response.count).toBeGreaterThanOrEqual(0);
  });
});
