import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Employee>;

  id: string;

  employee: Employee;

  constructor(private router: Router, private route: ActivatedRoute,
    public flushMessages: FlashMessagesService,
    private readonly db: AngularFirestore
  ) {
    this.itemsCollection = db.collection<Employee>('employees');
    route.params.subscribe((params: Params) => {

      this.id = params.id;
      console.log(this.id);
    });


    this.getById(this.id);
  }
  ngOnInit() {
  }


  getById(id) {

    this.itemsCollection.doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

}
