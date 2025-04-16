import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductsComponent } from './page/products/products.component';
import { ClientComponent } from './layout/client/client.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ProductListComponent } from './page/admin/product-list/product-list.component';
import { ProductAddComponent } from './page/admin/product-add/product-add.component';
import { ProductEditComponent } from './page/admin/product-edit/product-edit.component';
import { BookListComponent } from './page/admin/book-list/book-list.component';
import { BookAddComponent } from './page/admin/book-add/book-add.component';
import { BookEditComponent } from './page/admin/book-edit/book-edit.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { AboutComponent } from './component/page/about/about.component';
import { NotfoundComponent } from './component/page/notfound/notfound.component';
import { ThietkeListComponent } from './page/admin/thietke-list/thietke-list.component';

export const routes: Routes = [
  {
    path: '', component: ClientComponent, children:[
      {
        path:'', component: HomeComponent
      },
      {
        path:'about', component: AboutComponent
      },
      {
        path:'product', component: ProductsComponent
      },
      {
        path: 'product/:id', component: ProductDetailComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children:[
      { path: 'product', component: ProductListComponent},
      { path: 'product/add', component: ProductAddComponent},
      { path: 'product/edit/:id', component: ProductEditComponent},
      { path: 'book', component:BookListComponent },
      { path: 'book/add', component:BookAddComponent },
      { path: 'book/edit/:id', component:BookEditComponent },
      {path :'thietke',component:ThietkeListComponent}

    ]
  },
  {
    path:"**",
    component: NotfoundComponent
  }
];