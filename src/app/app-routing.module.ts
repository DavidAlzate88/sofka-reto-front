import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ListComponent as ProductListComponent } from "./products/list/list.component";
import { ListComponent as BuysListComponent } from "./buys/list/list.component";
import { CreateComponent as ProductCreateComponent } from "./products/create/create.component";


const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: AppComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'products', component: ProductListComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'buys', component: BuysListComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
