import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit {
  @Input() name = '';
  @Input() unit = '';
  @Input() amount = 0;

  constructor() {}

  ngOnInit() {}
}
