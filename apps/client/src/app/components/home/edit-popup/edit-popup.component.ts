import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Product } from '../../../types/general';
@Component({
  selector: 'angular-nest-monorepo-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    RatingModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  @Input() display = false;
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm = () => {
    this.confirm.emit(this.product);
  };

  onCancel = () => {
    this.display = false;
  };
}
