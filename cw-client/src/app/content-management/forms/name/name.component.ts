import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent {

  @Input() value
  @Output() valueChange = new EventEmitter<string>()

}
