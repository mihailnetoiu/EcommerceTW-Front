import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  filterCategory(categ: string) {
    const category = categ;
    this.router.navigate(['/filter'], {
      state: {
        category,
        productName: undefined
      }
    });
  }

}
