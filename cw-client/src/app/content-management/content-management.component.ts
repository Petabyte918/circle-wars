import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements OnInit {

  name
  description
  tradable
  notes

  constructor() { }

  ngOnInit() {
  }

  getV() {
    console.log(this.name, this.description, this.tradable, this.notes)
  }

}
