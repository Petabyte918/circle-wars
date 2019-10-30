import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'p-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.css']
})
export class BooleanComponent {

  @Input() value
  @Output() valueChange = new EventEmitter<boolean>()

}
