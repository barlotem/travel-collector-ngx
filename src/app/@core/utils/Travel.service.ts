import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Travel } from '../models/Travel';

@Injectable()
export class TravelService {

  private travelList = new BehaviorSubject<Travel[]>(null);

  constructor() { }
  
  setTravelList(travelList: Travel[]) {
    this.travelList.next(travelList);
    // set to local storage
    localStorage.setItem("travelList", JSON.stringify(travelList));
  }

  public getTravelList() {
    return this.travelList.asObservable();
  }
}