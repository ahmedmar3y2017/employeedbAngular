import { Component, OnInit } from '@angular/core';


import { Employee } from '../Employee';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Employee>;
  items: Observable<Employee[]>;
  employees: Employee[] = [];

  totalEmp: number;
  totalSalEmp: number;

  constructor(private readonly db: AngularFirestore) {
    this.itemsCollection = db.collection<Employee>('employees');


    // this.items = this.itemsCollection.valueChanges();
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
      }))
    );
    this.items.subscribe(emp => {
      this.employees = emp as Employee[];

    });
    this.getTotal();

  }

  ngOnInit(): void {

  }


  getTotal() {

    let totalSal = 0;
    let count = 0;
    for (let index = 0; index < this.employees.length; index++) {
      count += 1;
      totalSal += parseFloat(this.employees[index].salary.toString());

    }

    this.totalEmp = count;
    this.totalSalEmp = totalSal;




  }


  addItem(emp: Employee) {
    // Persist a document id
    const id = this.db.createId();
    this.itemsCollection.doc(id).set(emp);
  }

}
