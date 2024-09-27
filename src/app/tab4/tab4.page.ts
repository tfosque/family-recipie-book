import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SpoonacularService } from '../services/spoonacular.service';
import { IonModal, ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  food$ = new BehaviorSubject<any>([]);
  presentingElement: any = null;

  constructor(
    private readonly spoonacularSvc: SpoonacularService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    console.log('tab/4');
    this.spoonacularSvc.getFoodSpoonacular();
    //
    this.spoonacularSvc.food$.subscribe((f: any) => {
      console.log({ f });
      this.food$.next(f);
    });
  }

  async openModal(item: any) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        item: item,
      },
    });
    // this.modal.setCurrentBreakpoint(0.5);
    return await modal.present();
  }

  dismissModal() {
    this.modal.dismiss();
  }

  handleImgError(evt: any) {}
}
