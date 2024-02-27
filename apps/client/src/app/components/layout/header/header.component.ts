import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'angular-nest-monorepo-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Create',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
