import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }
  private getRandomDelay(): number {
    return Math.floor(Math.random() * 2000) + 500;
   }
 
   getData(name:string): Observable<any> {
     const data = JSON.parse(localStorage.getItem(name) as string || "") || []
     return of(data).pipe(delay(this.getRandomDelay()));
   }
   
   saveData<T>(name:string,body:T):Observable<any> {
     const response = {success:true}
     const bodyData = typeof(body)==="string"?body:JSON.stringify(body)
     const previousData = JSON.parse(localStorage.getItem(name) as string) || []
     previousData.push(bodyData)
     localStorage.setItem(name,JSON.stringify(previousData))
     return of({...response}).pipe(delay(this.getRandomDelay()));
   }
}