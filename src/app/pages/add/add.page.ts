import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../../services/item.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage  {

  newItem: Item = { id: 0, name: '', description: '', dueDate: '', isCompleted: false };

  constructor(private itemService: ItemService, private navCtrl: NavController) {}


  addItem() {
    this.itemService.addItem(this.newItem);
    this.navCtrl.navigateBack('/list');
  }
}
