import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Employee>;
  id: string;
  employee: Employee = {

    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    phone: 0,
    salary: 0

  };
  constructor(private router: Router, private route: ActivatedRoute,
    public flushMessages: FlashMessagesService,
    private readonly db: AngularFirestore
  ) {
    route.params.subscribe((params: Params) => {

      this.id = params.id;
      console.log(this.id);
    });

    this.itemsCollection = db.collection<Employee>('employees');

    this.getById(this.id);

    console.log("This : ", this.employee);

  }

  ngOnInit() {
  }
  // get by Id
  getById(id) {

    this.itemsCollection.doc(id).valueChanges().subscribe(emp => {

      this.employee = emp;
      console.log("This : ", this.employee);

    });



    // ref.get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());

    //   } else {
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });

  }

}
