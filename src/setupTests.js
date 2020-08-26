// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import idk from "@testing-library/jest-dom/extend-expect";
import {
  toBeInTheDocument,
  toHaveClass,
} from "@testing-library/jest-dom/matchers";

expect.extend({ toBeInTheDocument, toHaveClass });
