import '!!style-loader!css-loader!./styles.css';
import { withKnobs } from '@storybook/addon-knobs';
import type { Preview } from '@storybook/angular';

export default {
  tags: ['autodocs'],
  decorators: [withKnobs],
} as Preview;
