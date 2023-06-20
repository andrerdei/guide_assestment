import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckScreenStatusService {

  // Private Variables

  private screenWidth: number = window.innerWidth;
  private isMobileSubject: Subject<any> = new Subject<boolean>();
  private renderer: Renderer2;

  // Constructor

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.checkScreenSize();
  }

  // Private Methods

  private checkScreenSize(): void {
    this.renderer.listen('window', 'resize', () => {
      this.screenWidth = window.innerWidth;
      this.isMobileSubject.next(this.screenWidth <= 1000);
    });
  }

  // Public Methods

  public getScreenSizeAtFirstLoad(): boolean {
    return this.screenWidth <= 1200;
  }

  public getScreenSize(): Observable<boolean> {
    return this.isMobileSubject.asObservable();
  }
}
