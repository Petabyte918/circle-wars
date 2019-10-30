import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  @Input() value
  @Output() valueChange = new EventEmitter<string>()

}
