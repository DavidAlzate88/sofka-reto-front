import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpProviderService } from "../../service/http-provider.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tittle = 'Pokemon product list';
  displayedColumns: string[] = ['name', 'inInventory', 'enabled', 'min', 'max', 'actions'];
  dataSource = [];

  constructor(
    private  route: Router,
    private httpProvider : HttpProviderService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  async getAllProducts() {
    this.httpProvider.getAllProducts().subscribe((data : any) => {
        if (data != null && data.body != null) {
          const resultData
            = data.body;
          if (resultData) {
            this.dataSource = resultData;
          }
        }
      },
      (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.dataSource = [];
            }
          }
        }
      });
  }

  createProduct() {
    this.route.navigate(['products/create']);
  }

  updateProduct(id: String) {
    this.route.navigate(
      ['products/create'],
      {
        queryParams: { id }
      }
    );
  }

  deleteProduct(id: String) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {
        title: 'Borrar producto',
        msg: 'Do you want to delete this product?',
        data: { id }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result)
        console.log('remove product')
      }
    });
  }
}
