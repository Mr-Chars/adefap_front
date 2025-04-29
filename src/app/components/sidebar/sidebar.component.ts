import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  nameUserLogged = '';
  roleLogged = '';
  regionLogged = '';
  constructor(
    public router: Router,
  ) {
    const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
    console.log(dataDecripted);

    this.nameUserLogged = dataDecripted.name;
    this.roleLogged = dataDecripted.role;
    this.regionLogged = dataDecripted.region_name || 'Global';
  }

  closeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_logged');
    this.router.navigate(['/login']);
  }
}
