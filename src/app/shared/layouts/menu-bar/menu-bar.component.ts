import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services';
import { Category } from '../../models';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  categories: Array<Category>;
  constructor(
    private notify: NotificationService,
    private categorySercive: CategoryService
    ) { }

  ngOnInit() {
    this.categorySercive.getAll().subscribe(
      (data: any) => {
        this.categories = data;
      }, (err: any) => {
        this.notify.printErrorMessage(err.errors);
      });
  }

}
