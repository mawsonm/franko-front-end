import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  navSubject = new BehaviorSubject('transform');

  constructor(private http : HttpClient) { }

  getInstagramInfo() : any {
    var options = new HttpHeaders()
    .append("x-rapidapi-host", "instagram40.p.rapidapi.com")
    .append("x-rapidapi-key", "ac950bfb9cmsha4e84c1a2ec807fp1fe287jsn58591b9e28f1");
    return this.http.get("https://instagram40.p.rapidapi.com/account-info?username=_frankie_diamond&wrap=0",{headers: options});
  }
}
