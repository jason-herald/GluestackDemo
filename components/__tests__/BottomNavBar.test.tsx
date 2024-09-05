import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BottomNavBar from "../BottomNavBar";
import { useRouter } from "expo-router"; 

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("BottomNavBar", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  it("renders correctly", () => {
    const { getByTestId } = render(<BottomNavBar />);

   
    expect(getByTestId("bottom-nav-bar")).toBeTruthy();
    expect(getByTestId("home-icon")).toBeTruthy();
    expect(getByTestId("bag-icon")).toBeTruthy();
    expect(getByTestId("favorites-icon")).toBeTruthy();
    expect(getByTestId("user-icon")).toBeTruthy();
  });

  it("navigates to checkout when the shopping bag icon is pressed", () => {
    const { getByTestId } = render(<BottomNavBar />);

    const bagIcon = getByTestId("bag-icon");

    fireEvent.press(bagIcon);

    expect(mockPush).toHaveBeenCalledWith("/checkout");
  });

  it("navigates to favorites when the heart icon is pressed", () => {
    const { getByTestId } = render(<BottomNavBar />);

    const favoritesIcon = getByTestId("favorites-icon");

    fireEvent.press(favoritesIcon);

    expect(mockPush).toHaveBeenCalledWith("/favorites");
  });
});
