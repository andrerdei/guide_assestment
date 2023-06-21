import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, of, throwError } from 'rxjs';
import { CheckScreenStatusService } from '../../services/check-screen-status/check-screen-status.service';
import { StockPriceService } from '../../services/stock-price/stock-price.service';
import { ApplicationHeaderComponent } from './application-header.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ApplicationHeaderComponent', () => {
  let component: ApplicationHeaderComponent;
  let fixture: ComponentFixture<ApplicationHeaderComponent>;
  let checkScreenStatusService: CheckScreenStatusService;
  let stockPriceService: StockPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationHeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [CheckScreenStatusService, StockPriceService]
    }).compileComponents().then();

    fixture = TestBed.createComponent(ApplicationHeaderComponent);
    component = fixture.componentInstance;
    checkScreenStatusService = TestBed.inject(CheckScreenStatusService);
    stockPriceService = TestBed.inject(StockPriceService);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should get screen size on initialization', () => {
    const screenSizeSpy = spyOn(checkScreenStatusService, 'getScreenSize').and.returnValue(of(true));
    component.ngOnInit();
    expect(screenSizeSpy).toHaveBeenCalled();
    expect(component.isMobile).toBe(true);
  });

  it('should handle error when getting screen size', () => {
    const errorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    spyOn(checkScreenStatusService, 'getScreenSize').and.returnValue(throwError(errorResponse));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith(errorResponse.message);
  });

  it('should unsubscribe from checkScreenSubscription on component destroy', () => {
    const unsubscribeSpy = spyOn(Subscription.prototype, 'unsubscribe');
    component.checkScreenSubscription = new Subscription(); // Initialize checkScreenSubscription
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
