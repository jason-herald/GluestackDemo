import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProductCard from "../ProductCard";

import '@testing-library/jest-native/extend-expect'; 

describe("ProductCard", () => {
  const mockItem = {
    id: "1",
    image: { uri: "https://example.com/image.jpg" },
    title: "Sample Product",
    subtitle: "Sample Subtitle",
    price: "29.99",
    rating: "4.5",
  };

  const mockToggleFavorite = jest.fn();
  const mockOnPress = jest.fn();
  const mockIsFavorite = jest.fn().mockReturnValue(false);

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <ProductCard
        item={mockItem}
        toggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
        onPress={mockOnPress}
      />
    );

    expect(getByText("Sample Product")).toBeTruthy();
    expect(getByText("Sample Subtitle")).toBeTruthy();
    expect(getByText("$29.99")).toBeTruthy();
    expect(getByText("4.5")).toBeTruthy();
    expect(getByTestId("product-image")).toBeTruthy();
  });

  it("calls onPress when the card is pressed", () => {
    const { getByTestId } = render(
      <ProductCard
        item={mockItem}
        toggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByTestId("product-image"));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it("calls toggleFavorite when the favorite button is pressed", () => {
    const { getByTestId } = render(
      <ProductCard
        item={mockItem}
        toggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByTestId("favorite-button"));

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockItem);
  });

 
});
