import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import {Product} from "../../models/Product";
import {HttpProviderService} from "../../service/http-provider.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModalComponent} from "../../modal/modal.component";
import {MatDialog} from "@angular/material/dialog";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  id!: number;
  tittle = '';
  matcher = new MyErrorStateMatcher();

  productForm = this.fb.group({
    name: ['', Validators.required],
    inInventory: ['', [Validators.required]],
    enabled: [false, [Validators.required]],
    min: ['', [Validators.required]],
    max: ['', [Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpProvider : HttpProviderService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        console.log(params['product'])
        this.id = params['id'];
        this.tittle = !this.id ? 'Create pokemon product' : 'Update pokemon product: ' + this.id
        }
      );
  }

  onSubmit() {
    if (!this.id) {
      this.createProduct(this.productForm.value);
    } else {
      this.updateProduct(this.productForm.value);
    }
  }

  private createProduct(value: any) {
    this.httpProvider.saveProduct(value).subscribe((data : any) => {
        if (data.status === 204 && data.statusText === 'No Content') {
          this.router.navigate(['products/create']);
        }
      },
      (error : any)=> {
        if (error) {
          if (error.status == 400) {
            const errors = error.error.product;
            // this.openSnackBar('An Error occurred while trying to create the product. Try again later');
            this.modalMessage(errors);
          }
        }
      });
  }

  private updateProduct(value: any) {

  }

  modalMessage(data: any) {
    this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Error',
        msg: 'An Error occurred while trying to create the product',
        cancel: false,
        errors: { values: data }
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
