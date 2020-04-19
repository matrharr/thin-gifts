import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  requestOptions: any

  constructor(private http:HttpClient) {
    this.requestOptions = {
      // headers: this.headers,
      withCredentials: true,
    }
  }

  getProducts(type) {
    return this.http.get(
      `http://localhost:8000/products/get_products/?type=${type}`, 
      this.requestOptions
    );
  }

  addToCart(values) {
    return this.http.post(
      `http://localhost:8000/shopping_cart/update_cart/`,
      values,
      this.requestOptions
    )
  }

  getCart() {
    return this.http.get(
      `http://localhost:8000/shopping_cart/get_cart_quantity/`,
      this.requestOptions
    );
  }

}
