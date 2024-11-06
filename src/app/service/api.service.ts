  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { map, Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    // Set your base URL for laptop and mobile
    private baseUrl: string = 'https://muhammadshamoonhussain.github.io/data/db.json' // Change to your local IP

    constructor(private http: HttpClient) {}

    // Contact form submission
    getContact(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/contact`, data);
    }

    // Checkout form submission
    getcheckOut(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/order`, data);
    }

    // Fetch a specific product
    getProduct(id: number): Observable<any> {
      return this.http.get(this.baseUrl).pipe(map((a:any) => a.products))
    }

    // Fetch all products
    productList(): Observable<any> {
     return this.http.get(this.baseUrl).pipe(map((a:any) => a.products))
    }

    // Add a new product
    addProduct(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/products`, data);
    }
  }
