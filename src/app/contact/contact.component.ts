import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../service/api.service';
import Swal from "sweetalert2";
import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/compat/firestore";



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  myContact!: FormGroup;
  private myform:AngularFirestoreCollection<any> | undefined
 contactmsg!:string
  constructor(private fb: FormBuilder, private api: ApiService , private firestore:AngularFirestore) {
    this.myContact = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.myform = this.firestore.collection('E-cart Contact')
  }

  onSubmit(val:any) {
    if (this.myContact.valid) {
      this.myform?.add(val).then(res =>{
      this.contactmsg = 'Contact Form is Submitted'
        Swal.fire({
          title: "Your Form Is Submitted!",
      icon: "success",
      timer:1000,
      timerProgressBar:true,
      willClose(popup) {
       
      },
        });
      })
      .catch(err =>{
        this.contactmsg = 'Error';
        Swal.fire({
          title: "Oops!",
          text: "Please fill in all required fields!",
          icon: "error",
          confirmButtonText: "Okay"
        });
      })
      this.myContact.reset();
     
    }
  }
}
