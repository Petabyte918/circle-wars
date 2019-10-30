import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() name
  @Output() nameChange = new EventEmitter<string>()
  @Input() description
  @Output() descriptionChange = new EventEmitter<string>()
  @Input() tradable
  @Output() tradableChange = new EventEmitter<boolean>()
  @Input() notes
  @Output() notesChange  = new EventEmitter<string>()

  testForm() {
    console.log(this.name, this.description, this.tradable, this.notes)
  }

}
