import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-item.component.html',
  styleUrl: './favourite-item.component.scss',
})
export class FavouriteItemComponent {
  @Input({ required: true }) url!: string;
  @Input({ required: true }) breed!: string;

  @Output() remove = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();
}
