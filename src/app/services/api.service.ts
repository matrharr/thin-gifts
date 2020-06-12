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

  formatQP(queryParams){
    let queryString = '';
    for (let [key, value] of Object.entries(queryParams)) {
      queryString += `${key}=${value}`;
    }
    return queryString
  }

  getProducts(type, qpObj=null) {
    let qp;
    if(qpObj) {
      qp = this.formatQP(qpObj);
    }
    return this.http.get(
      `http://127.0.0.1:8000/products/get_products/?type=${type}&${qp}`, 
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

  getProductsByTag(productType, tagIds) {
    let queryParams = '';
    if(tagIds) {
      queryParams = this.formatTagQueryParams('tags', tagIds);
    }
    return this.http.get(
      `http://127.0.0.1:8000/products/?type=${productType}&${queryParams}`, 
      this.requestOptions
    );
  }

  captureOrder(orderId, shoppingCartId, email) {
    return this.http.post(
      `http://127.0.0.1:8000/execute_payment/`,
      {
        order_id: orderId,
        shopping_cart_id: shoppingCartId,
        email: email,
      },
      this.requestOptions
    )
  }

  getOrder(orderId) {
    return this.http.get(
      `http://127.0.0.1:8000/orders/${orderId}/`, 
      this.requestOptions
    );
  }

  deleteCartProduct(cartProductId) {
    return this.http.delete(
      `http://127.0.0.1:8000/shopping_cart_products/${cartProductId}/`, 
      this.requestOptions
    );
  }

  formatTagQueryParams(key, values) {
    let queryParams = '';
    values.forEach((val) => {
      queryParams += `${key}=${val}&`
    });
    return queryParams;
  }

}
