import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';
import {AvatarDialogComponent} from '../avatar-dialog/avatar-dialog.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;

  avatarLink = 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png';

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
    ],
    nationality: [
      { type: 'required', message: 'Nationality is required.' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      email: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.avatarLink = result.link;
      }
    });
  }

  resetFields() {
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createUser(value, this.avatarLink)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/home']);
        }
      );
  }
}
