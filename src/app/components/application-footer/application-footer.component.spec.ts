import { ApplicationFooterComponent } from './application-footer.component';
import { CheckScreenStatusService } from '../../services/check-screen-status/check-screen-status.service';
import { of, Subscription } from 'rxjs';
import { TestBed } from "@angular/core/testing";

describe('ApplicationFooterComponent', () => {
  let component: ApplicationFooterComponent;
  let checkScreenStatusService: jasmine.SpyObj<CheckScreenStatusService>;

  beforeEach(async () => {
    checkScreenStatusService = jasmine.createSpyObj('CheckScreenStatusService', ['getScreenSize', 'getScreenSizeAtFirstLoad']);

    await TestBed.configureTestingModule({
      declarations: [ApplicationFooterComponent],
      providers: [{ provide: CheckScreenStatusService, useValue: checkScreenStatusService }]
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ApplicationFooterComponent);
    component = fixture.componentInstance;
    checkScreenStatusService.getScreenSizeAtFirstLoad.and.returnValue(false);
    component.checkScreenSubscription = new Subscription();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update isMobile when screen size changes', () => {
    checkScreenStatusService.getScreenSize.and.returnValue(of(true));
    component.ngOnInit();
    expect(component.isMobile).toBeTrue();

    checkScreenStatusService.getScreenSize.and.returnValue(of(false));
    component.ngOnInit();
    expect(component.isMobile).toBeFalse();
  });

  it('should set the width of footerRef element correctly', () => {
    const mockElementRef = { nativeElement: { style: { width: '' } } };
    component.footerRef = mockElementRef as any;

    component.calcWidthConsideringScrollBar();

    const expectedWidth = `calc(100% - ${window.innerWidth - document.documentElement.clientWidth}px)`;
    expect(component.footerRef.nativeElement.style.width).toBe(expectedWidth);
  });

  it('should unsubscribe from checkScreenSubscription on component destroy', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.checkScreenSubscription = mockSubscription;

    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
