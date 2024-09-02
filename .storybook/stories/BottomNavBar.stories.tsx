import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BottomNavBar from '../../components/BottomNavBar';




const meta: Meta<typeof BottomNavBar> = {
  title: 'Components/BottomNavBar',
  component: BottomNavBar,
};

export default meta;

type Story = StoryObj<typeof BottomNavBar>;

export const Default: Story = {};
