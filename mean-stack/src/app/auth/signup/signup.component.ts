import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStateSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authStateSub = this.authService
      .getAuthStateListener()
      .subscribe((authstate) => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
    form.resetForm();
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
