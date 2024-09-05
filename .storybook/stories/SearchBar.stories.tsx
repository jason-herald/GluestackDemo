import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import React from 'react';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    searchQuery: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    searchQuery: '',
    setSearchQuery: action('setSearchQuery'),
  },
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState(args.searchQuery);

    return (
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={(query) => {
          setSearchQuery(query); 
          args.setSearchQuery(query); }}
      />
    );
  },
};
