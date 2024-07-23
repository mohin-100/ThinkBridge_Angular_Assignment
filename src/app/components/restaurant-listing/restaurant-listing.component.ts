import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css'],
})
export class RestaurantListingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'location', 'actions'];
  restaurants = new MatTableDataSource<any>([]);
  totalRestaurants = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.restaurants.paginator = this.paginator;
    }
  }

  //fetch restaurants from API
  private loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        this.restaurants.data = data;
        this.totalRestaurants = data.length;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  //apply search filter
  applyFilter(filterValue: any): void {
    this.restaurants.filter = filterValue.target.value.trim().toLowerCase();
  }

  //handle page change
  pageChanged(event: any): void {
    if (this.restaurants && this.restaurants.paginator) {
      this.restaurants.paginator.pageIndex = event.pageIndex;
      this.restaurants.paginator.pageSize = event.pageSize;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  addRestaurant(): void {
    this.router.navigate(['/add-restaurant']);
  }

  editRestaurant(id: string): void {
    this.router.navigate(['/edit-restaurant', id]);
  }

  //delete API with SWAL confirmation
  deleteRestaurant(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.restaurantService.deleteRestaurant(id).subscribe(
          () => {
            this.loadRestaurants();
            Swal.fire(
              'Deleted!',
              'The restaurant has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting restaurant:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the restaurant.',
              'error'
            );
          }
        );
      }
    });
  }
}
