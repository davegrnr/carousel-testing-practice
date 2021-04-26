import React from "react";
import { render, fireEvent, queryByAltText } from "@testing-library/react";
import Carousel from "./Carousel";

// smoketest
it("renders without crashing", () => {
  render(<Carousel />)
})

// Snapshot
it("matches a snapshot", () => {
  const{asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot();
})

it("moves carousel to previous image on left arrow click", () => {
  // Select right arrow, move carousel once to the right (2nd image)
  const { queryByTestId, queryByAltText } = render(<Carousel />)
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // Check for 2nd image and left arrow
  const leftArrow = queryByTestId("left-arrow")
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // Click left arrow and check for 1st image now showing
  fireEvent.click(leftArrow)
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})

it("does not show left arrow at start", () => {
  const { queryByTestId } = render(<Carousel />)
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
})

it("does not show right arrow at last image", () => {
  const { queryByTestId } = render(<Carousel />)
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument()
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
