import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckIfIsAdminGuard {
  constructor(
    private authService: AuthService,
    public router: Router
  ) {

  }

  canActivate() {
    const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
    if (+dataDecripted.role === 1) {
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
