import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../../.storybook/preview';
