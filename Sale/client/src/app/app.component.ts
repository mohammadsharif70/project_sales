import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
routerActive: boolean = false;

constructor(private router: Router){


}
  title = 'BeED Sales Reporting System ';




  openLogin(){
    this.routerActive = true;
this.router.navigate(['/login'])
  }
}
