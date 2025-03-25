import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckIfIsLoggedOnGuard {
  constructor(
    private authService: AuthService,
    public router: Router
  ) {

  }

  canActivate() {

    return this.authService.isLogged().pipe(map((data: any) => {
      if (data.status) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }));

  }
}
