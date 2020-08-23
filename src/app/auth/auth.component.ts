import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService, SignUpResponse } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
  providers: [],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertView: PlaceholderDirective;
  isLoginMode: boolean = true;
  loginForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
  subscriptions: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.formInit();
  }

  toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  formInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    let authObservable = new Observable<SignUpResponse>();
    this.isLoading = true;
    if (!this.isLoginMode) {
      authObservable = this.authService.signUp(this.loginForm.value);
    } else {
      authObservable = this.authService.login(this.loginForm.value);
    }

    authObservable.subscribe(
      (res) => {
        this.loginForm.reset();
        this.error = null;
        this.isLoading = false;
        this.router.navigate(["/recipe"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showError(this.error);
        this.isLoading = false;
      }
    );
  }

  showError(errorMsg: string) {
    const alertFactoryResolver = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const alertView = this.alertView.viewContainerRef;
    alertView.clear();
    const alertReference = alertView.createComponent(alertFactoryResolver);
    alertReference.instance.message = errorMsg;
    this.subscriptions = alertReference.instance.emitData.subscribe((res) => {
      this.subscriptions.unsubscribe();
      alertView.clear();
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
