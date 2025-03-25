import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ModalWarningComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
  });

  constructor(
    public router: Router,
    // private authService: AuthMockService,
    private authService: AuthService,
  ) { }

  async login() {
    try {
      const body = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      const response: any = await firstValueFrom(this.authService.login(body));
      if (response.status) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_logged', JSON.stringify(response.user[0]));
        // localStorage.setItem('token_exp', tokenExp);
        this.router.navigate(['/']);
      } else {
        this.modalWarning.open(response.error);
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }
}
