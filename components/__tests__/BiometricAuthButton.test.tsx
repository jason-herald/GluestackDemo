import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BiometricAuthButton from '../BiometricAuthButton'; 

describe('BiometricAuthButton', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BiometricAuthButton onAuthenticate={() => {}} />);
    
    expect(getByText('Login with Face ID')).toBeTruthy();
  });

  it('should call onAuthenticate when button is pressed', () => {
    const mockAuthenticate = jest.fn();

    const { getByText } = render(<BiometricAuthButton onAuthenticate={mockAuthenticate} />);
    const button = getByText('Login with Face ID');

    fireEvent.press(button);

    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
  });
});
