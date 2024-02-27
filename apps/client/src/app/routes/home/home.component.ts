import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from '../../components/home/product/product.component';
import { EditPopupComponent } from '../../components/home/edit-popup/edit-popup.component';
import { ProductsService } from '../../services/products.service';
import { Product, Products } from '../../types/general';

@Component({
  selector: 'angular-nest-monorepo-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, DoCheck {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  rows = 5;
  totalProducts = 0;

  displayAddPopup = false;
  displayEditPopup = false;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    rating: 0,
    price: '',
  };

  toggleEditPopup = (product: Product) => {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  };

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngDoCheck(): void {
    console.log(this.displayAddPopup);
  }

  toggleAddPopup = () => {
    this.displayAddPopup = !this.displayAddPopup;
  };

  toggleDeletePopup = (product: Product) => {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  };

  handleEditConfirm = (product: Product) => {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(this.selectedProduct.id, product);
    this.displayEditPopup = false;
  };

  handleAddConfirm = (product: Product) => {
    this.addProduct(product);
    this.displayAddPopup = false;
  };

  onPageChange(event: any) {
    this.fetchProducts(event.page + 1, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/products/v1/', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalProducts = products.total;
        },
        error: (error) => {
          console.log('Error', error);
        },
      });
  }

  editProduct = (id: number, product: Product) => {
    this.productsService
      .updateProduct(`http://localhost:3000/products/v1/${id}`, product)
      .subscribe({
        next: () => {
          this.fetchProducts(1, this.rows);
        },
        error: (error) => console.log(error),
      });
  };

  addProduct = (product: Product) => {
    this.productsService
      .addProduct(`http://localhost:3000/products/v1`, product)
      .subscribe({
        next: () => {
          this.fetchProducts(1, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  deleteProduct = (id: number) => {
    this.productsService
      .deleteProduct(`http://localhost:3000/products/v1/${id}`)
      .subscribe({
        next: () => {
          this.fetchProducts(1, this.rows);
        },
        error: (error) => console.log(error),
      });
  };

  ngOnInit() {
    this.fetchProducts(1, this.rows);
  }
}
