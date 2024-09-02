import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BiometricAuthButton from '../../components/BiometricAuthButton';

const meta: Meta<typeof BiometricAuthButton> = {
  title: 'Components/BiometricAuthButton',
  component: BiometricAuthButton,
};

export default meta;

type Story = StoryObj<typeof BiometricAuthButton>;

export const Default: Story = {
  args: {
    onAuthenticate: action('onAuthenticate'),
  },
};
