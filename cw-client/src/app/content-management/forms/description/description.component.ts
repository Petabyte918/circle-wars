import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {

  @Input() value
  @Output() valueChange = new EventEmitter<string>()

}
