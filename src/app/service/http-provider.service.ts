import { Injectable } from '@angular/core';
import {WebApiService} from "./web-api.service";
import {Observable} from "rxjs";

const apiUrl = "http://localhost:8080/";

const httpLink = {
  productsUrl: apiUrl + "api/products",
  buyssUrl: apiUrl + "api/buys"
};

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllProducts(): Observable<any> {
    return this.webApiService.get(httpLink.productsUrl);
  }

  public saveProduct(model: any): Observable<any> {
    return this.webApiService.post(httpLink.productsUrl, model);
  }

  public deleteProduct(id: String): Observable<any> {
    console.log(id);
    return this.webApiService.delete(httpLink.productsUrl + '/' + id, "");
  }

  public getProductById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.productsUrl + model);
  }
}
