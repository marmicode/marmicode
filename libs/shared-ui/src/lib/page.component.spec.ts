import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { PageComponent, PageModule } from '@marmicode/shared-ui';

import 'jest-mock';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let titleService: jest.Mocked<Title>;

  beforeEach(async () => {
    titleService = {
      setTitle: jest.fn(),
    } as any;
    await TestBed.configureTestingModule({
      imports: [PageModule],
      providers: [
        {
          provide: Title,
          useValue: titleService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(Title);
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  it('should set page title to "Marmicode" by default', () => {
    expect(titleService.setTitle).toBeCalledTimes(1);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('Marmicode');
  });

  it('should set default page title if title is null', () => {
    component.title = null;
    expect(titleService.setTitle).toBeCalledTimes(1);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('Marmicode');
  });

  it('should set page title', () => {
    component.title = '🍔';
    expect(titleService.setTitle).toBeCalledTimes(2);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('🍔 | Marmicode');
  });

  xit('🚧 should set page title to default on destroy', () => {
    fixture.destroy();
    expect(titleService.setTitle).toBeCalledTimes(2);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('Marmicode');
  });
});
