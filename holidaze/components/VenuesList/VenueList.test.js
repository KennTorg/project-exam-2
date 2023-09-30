import React from "react";
import { render, fireEvent } from "@testing-library/react";
import VenuesList from "./VenuesList";

test("it displays a success message", () => {
  const { getByText } = render(<VenuesList venues={[]} />);
  const button = getByText("Book Now");
  fireEvent.click(button); // Trigger an action that displays a success message
  const successMessage = getByText("Venue booked successfully!");
  expect(successMessage).toBeInTheDocument();
});

test("it displays an error message", () => {
  const { getByText } = render(<VenuesList venues={[]} />);
  const button = getByText("Book Now");
  fireEvent.click(button); // Trigger an action that displays an error message
  const errorMessage = getByText("An error occurred.");
  expect(errorMessage).toBeInTheDocument();
});

test("it displays a warning message", () => {
  const { getByText } = render(<VenuesList venues={[]} />);
  const button = getByText("Book Now");
  fireEvent.click(button); // Trigger an action that displays a warning message
  const warningMessage = getByText("This is a warning message.");
  expect(warningMessage).toBeInTheDocument();
});
