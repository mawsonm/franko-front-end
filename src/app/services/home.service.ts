import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  navSubject = new BehaviorSubject('transform');


  constructor() { }
}
