import { FrameComponent, FrameModule } from './frame.component';

export default {
  title: 'frame',
};

export const main = () => ({
  moduleMetadata: {
    imports: [FrameModule],
  },
  component: FrameComponent
});
