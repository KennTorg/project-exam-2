import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileCard from "./index";

describe("ProfileCard", () => {
  // Test case 1: Renders loading state when userData is null
  it("should render loading state", () => {
    const { getByTestId } = render(
      <ProfileCard userData={null} onAvatarChange={() => {}} />
    );
    const loadingElement = getByTestId("loading-element"); // Use an appropriate data-testid attribute
    expect(loadingElement).toBeInTheDocument();
  });

  // Test case 2: Renders user data when provided
  it("should render user data", () => {
    const userData = {
      avatar: "user-avatar.jpg",
      name: "John Doe",
      email: "johndoe@example.com",
      venueManager: true,
    };

    const { getByText, getByAltText } = render(
      <ProfileCard userData={userData} onAvatarChange={() => {}} />
    );

    // You can add more specific assertions here, e.g., getByText('John Doe'), getByAltText('User Avatar')
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByAltText("User Avatar")).toBeInTheDocument();
  });

  // Test case 3: Calls onAvatarChange when changing the avatar
  it("should call onAvatarChange when changing the avatar", () => {
    const onAvatarChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ProfileCard
        userData={
          {
            /* User data here */
          }
        }
        onAvatarChange={onAvatarChange}
      />
    );

    const inputElement = getByPlaceholderText("New Avatar URL");
    const submitButton = getByText("Change Avatar");

    // Simulate user input and submission
    fireEvent.change(inputElement, { target: { value: "new-avatar-url.jpg" } });
    fireEvent.click(submitButton);

    // Expect that onAvatarChange was called with the new avatar URL
    expect(onAvatarChange).toHaveBeenCalledWith("new-avatar-url.jpg");
  });
});
