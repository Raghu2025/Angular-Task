import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(loading: boolean): void {
    if (loading === true) {
      this.loadingSub.next(true);
    }else{
      this.loadingSub.next(false);
    }
  }


}