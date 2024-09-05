import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../Header'; 

describe('Header', () => {
  it('should render the welcome text', () => {
    const { getByText } = render(<Header />);
    
    expect(getByText('Hello, Welcome 👋')).toBeTruthy();
  });

  it('should render the user name', () => {
    const { getByText } = render(<Header />);
    

    expect(getByText('Albert Stevano')).toBeTruthy();
  });


});
