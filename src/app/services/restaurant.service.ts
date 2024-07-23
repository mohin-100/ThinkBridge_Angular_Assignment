import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  //set the secret key(apiUrl) in environment file

  //used sample API provider mockapi.io for APIs
  private apiUrl = `${environment.apiUrl}/foodieDelight/restaurants`;

  constructor(private http: HttpClient) {}

  // Fetch all restaurants
  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get a single restaurant by ID
  getRestaurantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new restaurant
  addRestaurant(restaurant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, restaurant);
  }

  // Update an existing restaurant
  updateRestaurant(id: string, restaurant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, restaurant);
  }

  // Delete a restaurant
  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
