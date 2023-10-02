import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from "./index";

describe("ProfileCard", () => {
  it("should render loading state when userData is null", () => {
    const { getByTestId, queryByAltText } = render(
      <ProfileCard userData={null} onAvatarChange={() => {}} />
    );

    // Verify that the loading element is displayed
    const loadingElement = getByTestId("loading-element");
    expect(loadingElement).toBeInTheDocument();

    // Verify that no user avatar is displayed (queryByAltText should not find it)
    const userAvatar = queryByAltText("User Avatar");
    expect(userAvatar).toBeNull();
  });
});