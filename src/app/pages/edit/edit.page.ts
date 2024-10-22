import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService, Item } from '../../services/item.service';
import { NavController } from '@ionic/angular'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  currentItem?: Item | any = { id: 0, name: '', description: '' };

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentItem = this.itemService.getItem(id);
  }

  updateItem() {
    if (this.currentItem) {
      this.itemService.updateItem(this.currentItem);
      this.navCtrl.navigateBack('/list');
    }
  }

}
