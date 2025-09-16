// src/app/shared/infrastructure/ui/thumbnail-item/thumbnail-item.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thumbnail-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thumbnail-item.component.html',
  styleUrl: './thumbnail-item.component.scss',
})
export class ThumbnailItemComponent {
  @Input({ required: true }) url!: string;
  @Input({ required: true }) breed!: string;
}
