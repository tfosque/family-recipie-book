import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  item: any = {};
  ingredients: any = [];
  instructions: any = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('this.item:', this.item);
    this.ingredients = this.item.nutrition.ingredients;
    this.instructions = this.item.analyzedInstructions[0].steps;
    console.log('analyzedINS:', this.instructions);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
