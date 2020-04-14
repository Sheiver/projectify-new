import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../services/firebase.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AvatarDialogComponent} from '../avatar-dialog/avatar-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;

  item: any;

  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    surname: [
      { type: 'required', message: 'Surname is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' }
    ],
    age: [
      { type: 'required', message: 'Age is required.' },
    ],
    gender: [
      { type: 'required', message: 'Gender is required.' }
    ]
  };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      email: [this.item.email, Validators.required],
      age: [this.item.age, Validators.required],
      gender: [this.item.gender, Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value) {
    if (this.item.avatar) {
      value.photoURL = this.item.avatar;
    } else {
      value.photoURL = this.item.photoURL;
    }
    value.age = Number(value.age);
    value.uid = this.item.uid;
    value.displayName = this.item.displayName;
    this.firebaseService.updateUser(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/contacts-home']);
        }
      );
  }

  delete() {
    this.firebaseService.deleteUser(this.item.id)
      .then(
        res => {
          this.router.navigate(['/contacts-home']);
        },
        err => {
          console.log(err);
        }
      );
  }

  cancel() {
    this.router.navigate(['/contacts-home']);
  }
}
