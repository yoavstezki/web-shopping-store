import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user.model';
import {Router} from '@angular/router';


//todo: yoavs export validators to util...
export const nameValidator = Validators.compose([Validators.required, Validators.minLength(2)]);
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

  name: FormControl;
  username: FormControl;
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

    this.userService.register(user)
      .subscribe((data: any) => {

        if (data.success) {
          this.router.navigate(['/login'])
        }
        else {
          //todo: handle errors and display...
        }
      });
  }

  private createFormControls() {
    this.name = new FormControl('', nameValidator);
    this.username = new FormControl('', nameValidator);
    this.email = new FormControl('', mailValidator);
    this.password = new FormControl('', passwordValidator);
  }

  private createFrom() {
    this.registerForm = this.builder.group({
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    });
  }
}
