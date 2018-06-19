import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { FlashMessagesService } from "angular2-flash-messages";
import { timeout } from 'q';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    phone: 0,
    salary: 0,
  }
  private itemsCollection: AngularFirestoreCollection<Employee>;

  constructor(public flushMessages: FlashMessagesService, public router: Router, private db: AngularFirestore) {

    this.itemsCollection = db.collection<Employee>('employees', x => x.orderBy("firstName", "asc"));



  }

  ngOnInit() {
  }


  mySubmit({ value, valid }: { value: Employee, valid: boolean }) {

    if (!valid) {
      this.flushMessages.show('Error Form Data ', { cssClass: 'alert-danger', timeout: 3000 });

      this.router.navigate(['add-emp']);
    } else {
      console.log(this.employee);

      this.addEmployee(this.employee);

      this.employee.firstName = "";
      this.employee.lastName = "";
      this.employee.email = "";
      this.employee.country = "";
      this.employee.city = "";
      this.employee.phone = 0;
      this.employee.salary = 0;
      this.flushMessages.show('Thanks New Employee Added ', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/']);

    }


  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.employee); }

  addEmployee(emp) {


    this.itemsCollection.add(emp);
  }



}
