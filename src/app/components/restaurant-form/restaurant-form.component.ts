import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
})
export class RestaurantFormComponent implements OnInit {
  // reactive form to handle forms
  restaurantForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
  });
  isEditMode: boolean = false;
  restaurantId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id') || '';

    // if id is avialable then set the form by fetching the values from API
    if (this.restaurantId) {
      this.isEditMode = true;
      this.loadRestaurantDetails();
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  private loadRestaurantDetails(): void {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(
      (data) => {
        this.restaurantForm?.patchValue({
          name: data.name,
          description: data.description,
          location: data.location,
        });
      },
      (error) => {
        console.error('Error fetching restaurant details:', error);
      }
    );
  }

  // common save function for add and update
  save(): void {
    this.restaurantForm.markAllAsTouched();
    if (this.restaurantForm.valid) {
      if (this.isEditMode) {
        this.restaurantService
          .updateRestaurant(this.restaurantId, this.restaurantForm.value)
          .subscribe(
            () => {
              Swal.fire(
                'Success',
                'Restaurant updated successfully',
                'success'
              );
            },
            (error) => {
              console.error('Error updating restaurant:', error);
            }
          );
      } else {
        this.restaurantService
          .addRestaurant(this.restaurantForm.value)
          .subscribe(
            () => {
              Swal.fire('Success', 'Restaurant added successfully', 'success');
              this.router.navigate(['/home']);
            },
            (error) => {
              console.error('Error adding restaurant:', error);
            }
          );
      }
    }
  }
}
