import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProductCard from '../../components/ProductCard'; 

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  argTypes: {
    item: {
      control: { type: 'object' },
    },
    isFavorite: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;


const sampleItem = {
  id: '1',
  image: require('../../assets/Product 1.png'), 
  title: 'Sample Product',
  subtitle: 'Best in the market',
  price: 99.99,
  rating: 4.5,
};

export const Default: Story = {
  args: {
    item: sampleItem,
    isFavorite: (id: string) => id === '1',
    toggleFavorite: action('toggleFavorite'),
    onPress: action('onPress'),
  },
};
