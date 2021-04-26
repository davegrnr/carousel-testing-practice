import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// smoketest
it('renders without crashing', () => {
    render(<Card />)
})

// snapshot test
it("matches a snapshot", () => {
    const{asFragment} = render(<Card />)
    expect(asFragment()).toMatchSnapshot();
})