import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'p-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  @Input() value
  @Output() valueChange = new EventEmitter<string>()

}
