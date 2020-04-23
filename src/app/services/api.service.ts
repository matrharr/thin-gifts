import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders({
    'Accept': 'application/json'
  });

  requestOptions: any

  constructor(private http:HttpClient) {
    this.requestOptions = {
      headers: this.headers,
      withCredentials: true,
    }
  }

  getProducts(type) {
    return this.http.get(
      `http://127.0.0.1:8000/products/get_products/?type=${type}`, 
      this.requestOptions
    );
  }

  addToCart(values) {
    return this.http.post(
      `http://127.0.0.1:8000/shopping_cart_products/create_or_update_cart/`,
      values,
      this.requestOptions
    )
  }

  getCart(cartId) {
    return this.http.get(
      `http://127.0.0.1:8000/shopping_cart/${cartId}/`,
      this.requestOptions
    );
  }

  getCartQuantity() {
    return this.http.get(
      `http://127.0.0.1:8000/shopping_cart/get_cart_quantity/`,
      this.requestOptions
    );
  }

  updateCartProduct(values, cartProductId) {
    return this.http.patch(
      `http://127.0.0.1:8000/shopping_cart_products/${cartProductId}/`,
      values,
      this.requestOptions
    )
  }

  getCartProduct(cartProductId) {
    return this.http.get(
      `http://127.0.0.1:8000/shopping_cart_products/${cartProductId}/`, 
      this.requestOptions
    );
  }

}