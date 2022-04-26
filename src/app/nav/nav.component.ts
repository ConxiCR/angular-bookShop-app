import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //inyección del router
  constructor(private router: Router) {}

  //método para hacer la navegación. Recibimos un path por parámetro y nos dirigimos hacía él
  navTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  ngOnInit(): void {
  }

}
