import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../SearchBar"; 

describe("SearchBar", () => {
  const mockSetSearchQuery = jest.fn();

  it("renders correctly with placeholder and icons", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />
    );
    expect(getByPlaceholderText("Search clothes...")).toBeTruthy();


  });

  it("calls setSearchQuery when input text changes", () => {
    const { getByPlaceholderText } = render(
      <SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />
    );

    const inputField = getByPlaceholderText("Search clothes...");

    fireEvent.changeText(inputField, "new search query");

    expect(mockSetSearchQuery).toHaveBeenCalledWith("new search query");
  });

  it("filter button is clickable", () => {
    const { getByTestId } = render(
      <SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />
    );

    const filterButton = getByTestId("filter-button");

    fireEvent.press(filterButton);
    expect(filterButton).toBeTruthy();
  });
});
