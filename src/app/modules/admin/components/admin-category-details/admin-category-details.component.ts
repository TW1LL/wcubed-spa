import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'admin-category-details',
  template: `    
    <mz-card>
      <mz-card-content>
        <form [formGroup]="categoryForm">
          <div class="row">
              <mz-textarea-container class="col s12 m6">
                <input mz-input mz-validation required
                       id="input-name"
                       formControlName="name"
                       type="text"
                       [errorMessageResource]="errorMessages.name"
                       [label]="'Category Name'">
              </mz-textarea-container>
              <mz-textarea-container class="col s12 m6">
                  <textarea mz-textarea required
                            [label]="'Description'"
                            id="textarea-desc"
                            formControlName="description"
                            length="500"></textarea>
              </mz-textarea-container>
              <mz-input-container class="col s12">
                <input mz-input
                       id="input-upload"
                       type="file"
                       (change)="updateUploadImage($event)"
                >
              </mz-input-container>
              <button (click)="addImage()">Add Image</button>
          </div>
        </form>
      </mz-card-content>
      <mz-card-action>
        <button mz-button [disabled]="!categoryForm.valid" (click)="onSubmit()">Submit</button>
      </mz-card-action>
    </mz-card>
  `,
  styles: []
})
export class AdminCategoryDetailsComponent implements OnInit {
  @Input()
  category: Category;
  categoryForm: FormGroup;
  image: File;
  errorMessages = {
    name: {
      required: 'A Category name is required'
    },
    description: {
      required: 'You must give the category a description'
    }
  }

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
      thumbnail: [this.category.thumbnail, Validators.required],
    })
  }


  addImage() {
    this.adminService.upload('products', this.image).then(() => {
      this.categoryForm.patchValue({thumbnail: 'products/'+this.image.name});
    });
  }

  onSubmit() {
     const copy = Object.assign(this.category, this.categoryForm.value);
     this.adminService.update('category', copy).then(() => {
       this.router.navigate(['admin/category']);
     })
  }

  updateUploadImage(event) {
    this.image = event.srcElement.files[0];
  }

}
