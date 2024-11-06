import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import Swal from "sweetalert2";
import { CartapiService } from "../service/cartapi.service";
import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { take } from 'rxjs';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkOut!: FormGroup
  order:boolean = false;
  product:any [] = []
  private checkout:AngularFirestoreCollection<any> | undefined
  message!:string
  constructor(private api:ApiService,private cartapi:CartapiService,private fb:FormBuilder,private firestore:AngularFirestore){
    this.checkOut = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    address:['',[Validators.required]],
    postal:['',[Validators.required]],
  })
  }
  ngOnInit(): void {
    this.checkout = this.firestore.collection('E-Cart-CheckOut')
    this.cartapi.getproduct().pipe(take(1)).subscribe((product => {
      this.product = product
    }))
  }

  check(value:any){
    if (this.checkOut.valid) {
    const total = this.cartapi.getTotal()
    const orderData ={
      ...value,
      product : this.product,
      total : total,
      date : new Date()
    }
    this.checkout?.add(this.checkOut.valid && orderData).then(res =>{
      this.message = 'Order is Submited'
      console.log('Document successfully written!',res);
      Swal.fire({
        title: "Order is Submitted!",
        icon: "success"
      });
      this.order = true
      this.cartapi.removeallproduct()
      this.checkOut.reset()
      this.product = []
    })
    .catch(err => {
      this.message = 'Error Occurred!';
      console.error('Error writing document: ', err);
        Swal.fire({
          title: "Oops!",
          text: "Please fill in all required fields!",
          icon: "error",
          confirmButtonText: "Okay"
        });
      });
    }
  }

}
