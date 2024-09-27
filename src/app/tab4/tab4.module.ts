import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { ModalComponent } from '../components/modal/modal.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab4PageRoutingModule],
  declarations: [
    Tab4Page,
    ModalComponent,
    InstructionsComponent,
    IngredientsComponent,
  ],
  exports: [],
})
export class Tab4PageModule {}
