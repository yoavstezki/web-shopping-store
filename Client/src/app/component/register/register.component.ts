import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user.model';
import {Router} from '@angular/router';


//todo: yoavs export validators to util...
const nameValidator = Validators.compose([Validators.required, Validators.minLength(2)]);
const mailValidator = Validators.compose([
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ]
);

const passwordValidator = Validators.compose([
  Validators.minLength(5),
  Validators.required,
  //todo: yoavs remove this is for the letters (both uppercase and lowercase) and numbers validation
  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
]);

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  registerForm: FormGroup;

  constructor(private builder: FormBuilder, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.createFormControls();
    this.createFrom()
  }

  registerUser() {
    const user: User = this.registerForm.value;

    this.userService
      .create(user)
      .subscribe((userDate) => {
        this.router.navigate(['/login'])
      });
  }

  private createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', nameValidator);
    this.email = new FormControl('', mailValidator);
    this.password = new FormControl('', passwordValidator);
  }

  private createFrom() {
    this.registerForm = this.builder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }
}
