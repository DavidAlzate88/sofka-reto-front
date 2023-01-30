import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpProviderService } from "../../service/http-provider.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "../../modal/modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private route: Router,
    private httpProvider : HttpProviderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  private async getAllProducts() {
    this.httpProvider.getAllProducts().subscribe((data : any) => {
        if (data != null && data.body != null) {
          const resultData = data.body;

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

  confirmDeleteProduct(id: String) {
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
        this.deleteProduct(result.id);
      }
    });
  }

  private deleteProduct(result: any) {
    this.httpProvider.deleteProduct(result).subscribe((data : any) => {
        if (data.status === 204 && data.statusText === 'No Content') {
          this.getAllProducts();
        }
      },
      (error : any)=> {
        if (error) {
          console.log(error);
          if (error.status == 404 && error.statusText === 'Not Found') {
            this.openSnackBar('An Error occurred while trying to delete the product. Try again later');
          }
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
