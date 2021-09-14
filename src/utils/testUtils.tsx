import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult => {
  // eslint-disable-next-line react/require-default-props
  const Wrapper: React.FC = ({ children }: { children?: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from "@testing-library/react";
// override render method
export { customRender as render };
