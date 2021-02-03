import { Title } from '@angular/platform-browser';
import { PageComponent } from '@marmicode/shared-ui';

import 'jest-mock';

describe('PageComponent', () => {
  let component: PageComponent;
  let titleService: jest.Mocked<Title>;

  beforeEach(() => {
    titleService = {
      setTitle: jest.fn(),
    } as any;
    component = new PageComponent(titleService);
  });

  xit('🚧 should set page title to "Marmicode" by default', () => {
    expect(titleService.setTitle).toBeCalledTimes(1);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('👨🏻‍🍳 Marmicode');
  });

  it('should set page title', () => {
    component.title = '🍔';
    expect(titleService.setTitle).toBeCalledTimes(1);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('🍔 | Marmicode');
  });

  xit('🚧 should set page title to default ond estroy', () => {
    // component.ngOnDestroy();
    // expect(titleService.setTitle).toBeCalledTimes(2);
    // expect(titleService.setTitle).toHaveBeenLastCalledWith('👨🏻‍🍳 Marmicode');
  });
});
