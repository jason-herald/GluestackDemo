import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState, useEffect } from 'react';
import CategoryFilter from '../../components/CategoryFilters'; 
import React from 'react';

const meta: Meta<typeof CategoryFilter> = {
    title: 'Components/CategoryFilter',
    component: CategoryFilter,
    argTypes: {
      selectedCategory: {
        control: { type: 'select' },
        options: ['All Items', 'Dress', 'T-Shirt', 'Pants'],
      },
    },
  };
  
  export default meta;
  
  type Story = StoryObj<typeof CategoryFilter>;
  
  export const Default: Story = {
    args: {
      selectedCategory: 'All Items',
      setSelectedCategory: action('setSelectedCategory'),
    },
    render: (args) => {

      const [selectedCategory, setSelectedCategory] = useState(args.selectedCategory);
  
     
      useEffect(() => {
        setSelectedCategory(args.selectedCategory);
      }, [args.selectedCategory]);
  
      return (
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={(category) => {
            setSelectedCategory(category); 
            args.setSelectedCategory(category); 
          }}
        />
      );
    },
  };
