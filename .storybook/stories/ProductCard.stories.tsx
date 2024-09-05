import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProductCard from '../../components/ProductCard'

const item = {
  id: 1,
  image: require('../../assets/Product 1.png'),
  title: 'Sample Product',
  subtitle: 'Sample subtitle for product',
  price: 29.99,
  rating: 4.5,
};

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  args: {
    item,
    toggleFavorite: action('toggleFavorite'),
    isFavorite: (id: number) => id === 1, 
    onPress: action('onPress'),
  },
};

export default meta;

export const Default: StoryObj<typeof ProductCard> = {};

export const Favorited: StoryObj<typeof ProductCard> = {
  args: {
    isFavorite: (id: number) => true,
  },
};

export const NotFavorited: StoryObj<typeof ProductCard> = {
  args: {
    isFavorite: (id: number) => false,
  },
};


