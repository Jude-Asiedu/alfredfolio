import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bio{
  firstName: string;
  lastName: string;
  about: string[];
  intro: string[];
}
@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor(private http:HttpClient) { 
    console.log(this.getBio());
    
  }
  getBio() {
    return this.http.get<Bio>('assets/json/bio.json');
   }
}
