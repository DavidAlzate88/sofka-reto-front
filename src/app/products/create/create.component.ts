import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

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
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        console.log(params['product'])
        this.id = params['id'];
        this.tittle=!this.id ? 'Create pokemon product' : 'Update pokemon product: ' + this.id
        }
      );
  }

  onSubmit() {
    console.log(this.productForm.value)
  }
}
