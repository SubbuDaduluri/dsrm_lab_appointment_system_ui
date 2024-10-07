import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCommomModule } from '../../../../shared/app.common.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppCommomModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  hideEyeIcon: boolean = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  error?: string = '';

  private _snackBar = inject(MatSnackBar);

  @Output() submitEM = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate(['/home']);
        },
        error: error => {
          this.error = error?.error?.message;
          this.toastrService.error('Invalid Username or Password.', 'Login Error', {
            timeOut: 3000,
          });
        }
      });
  }

  navigateToPartnetSignUp(){
    this.router.navigate(['/partner_signup']);
  }


}
