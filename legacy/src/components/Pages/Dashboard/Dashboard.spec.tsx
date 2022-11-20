import * as React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "../../../utils/testUtils";
import { Dashboard } from ".";
import "@testing-library/jest-dom";

jest.mock("../../../utils/storageUtils", () => ({
  getToken: () => '{"token":"test123"}',
}));

const localStorage = { getItem: () => '{ token: "test123" }' };
global.localStorage = { ...global.localStorage, ...localStorage };

const handlers = [
  rest.get("/wines", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 755,
          wineName: "Coonawarra",
          wineType: "Cabernet Sauvignon",
          vineyard: "Bowen Estate",
          vintage: 2013,
          qty: 1,
        },
        {
          id: 756,
          wineName: "Coonawarra",
          wineType: "Shiraz",
          vineyard: "Bowen Estate",
          vintage: 2013,
          qty: 1,
        },
        {
          id: 758,
          wineName: "Coonawarra",
          wineType: "Shiraz",
          vineyard: "Bowen Estate",
          vintage: 2014,
          qty: 1,
        },
        {
          id: 828,
          wineName: "Heathcote",
          wineType: "Shiraz",
          vineyard: "Shiraz Republic",
          vintage: 2013,
          qty: 1,
        },
        {
          id: 1,
          wineName: "The Bloc Estate Shiraz",
          wineType: "Shiraz",
          vineyard: "Bloc Estate",
          vintage: 2014,
          qty: 1,
        },
      ]),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

beforeEach(() => {
  // localStorage.setItem("token", JSON.stringify({ token: "test123" }));
  // const { setToken } = useAuth();
  // setToken({ token: "test123" });
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches the dashboard view", async () => {
  render(<Dashboard />);

  expect(screen.getByText("All wines")).toBeInTheDocument();

  // check for spinner
  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Vineyard")).toBeInTheDocument();
  });
});
