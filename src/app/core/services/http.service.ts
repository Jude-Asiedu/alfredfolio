import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected BASEURL = '';
  // interceptors = ' ErrorConfig'

  constructor(private http:HttpClient) { }

  get(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
    // url = this.ifFullUrl(url) ? url : this.url.concat(url);
    return this.http.get<any>(url, {
      // context: new HttpContext().set(ERROR_CONFIG_TOKEN, errorConfig),
      params: this.sanitizeParams(params),
      headers
    });
  }


  sanitizeParams(params: any): {} {
    const newParams: any = {};
    if (typeof params === 'object') {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
          newParams[key] = params[key];
        }
      });
    }
    return newParams
  }
}
