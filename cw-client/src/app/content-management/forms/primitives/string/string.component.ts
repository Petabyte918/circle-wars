import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'p-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent {

  @Input() value
  @Output() valueChange = new EventEmitter<string>()

}
