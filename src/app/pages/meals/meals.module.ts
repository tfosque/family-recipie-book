import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { MealsComponent } from 'src/app/components/meals/meals.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MealsPageRoutingModule],
  declarations: [MealsPage, MealsComponent],
  exports: [MealsComponent],
})
export class MealsPageModule {}
