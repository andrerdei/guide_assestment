import { TestBed } from '@angular/core/testing';
import { RendererFactory2 } from '@angular/core';
import { CheckScreenStatusService } from './check-screen-status.service';
import {Observable} from 'rxjs';

describe('CheckScreenStatusService', () => {
  let service: CheckScreenStatusService;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckScreenStatusService,
        { provide: RendererFactory2, useValue: { createRenderer: () => ({ listen: () => {} }) } },
      ],
    });

    service = TestBed.inject(CheckScreenStatusService);
    rendererFactory = TestBed.inject(RendererFactory2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if screen width is less than or equal to 850 at first load', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    service = new CheckScreenStatusService(rendererFactory);
    expect(service.getScreenSizeAtFirstLoad()).toBeTrue();
  });

  it('should return false if screen width is greater than 850 at first load', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(900);
    service = new CheckScreenStatusService(rendererFactory);
    expect(service.getScreenSizeAtFirstLoad()).toBeFalse();
  });

  it('should return an Observable from getScreenSize', () => {
    expect(service.getScreenSize()).toEqual(jasmine.any(Observable));
  });
});
