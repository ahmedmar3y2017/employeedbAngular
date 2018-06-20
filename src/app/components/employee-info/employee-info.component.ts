import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Employee } from '../Employee';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Employee>;

  id: string;
  updateSalaryInfo: boolean = true;
  employee: Employee = {

    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    phone: 0,
    salary: 0

  };
  items: Observable<Employee[]>;

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


  }
  ngOnInit() {
  }



  // get by Id
  getById(id) {

    this.itemsCollection.doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().firstName);

        this.employee = {
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          country: doc.data().country,
          email: doc.data().email,
          city: doc.data().city,
          phone: doc.data().phone,
          salary: doc.data().salary,
        };
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  // delete Employee
  OnDelete(id: string) {
    if (confirm('Areyou sure to delete  ? ')) {

      console.log("Done Delete ");
      this.db.doc('employees/' + id).delete();
      this.flushMessages.show('Success Delete Employee ', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/']);

    }
  }

  // update Salary 
  UpdateSalary(id: string) {
    this.db.doc<Employee>('employees/' + id).update(this.employee);
    // console.log("Done Updated ");
    this.flushMessages.show('Success Updated Succefffully ', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/employee/' + id]);

  }

}
