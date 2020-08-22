import * as request from "supertest";
import App from "../app";
import IndexRoute from "../routes/index.route";
let Test: any;
Test = App;

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing Index", () => {
  describe("[GET] /", () => {
    it("response statusCode 200", () => {
      const indexRoute = new IndexRoute();
      const app: any = new Test([indexRoute]);

      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
});
