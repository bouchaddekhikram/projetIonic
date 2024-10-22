import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../../services/item.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  upcomingTasks: Item[] = [];
  overdueTasks: Item[] = [];
  completedTasks: Item[] = [];

  constructor(private itemService: ItemService, private navCtrl: NavController) {}

  async ngOnInit() {
    const currentDate = new Date();
    
    await this.itemService.init(); // Wait for the storage to initialize
  
    const allItems = this.itemService.getItems(); // Get the items
   
    // Filter tasks
    this.upcomingTasks = allItems.filter(item => {
      const itemDueDate = new Date(item.dueDate); // Convert due date
      return itemDueDate >= currentDate && !item.isCompleted; // Upcoming tasks
    });
    console.log('Upcoming tasks:', this.upcomingTasks); // Log upcoming tasks
  
    this.overdueTasks = allItems.filter(item => {
      const itemDueDate = new Date(item.dueDate); // Convert due date
      return itemDueDate < currentDate && !item.isCompleted; // Overdue tasks
    });
    console.log('Overdue tasks:', this.overdueTasks); // Log overdue tasks
  
    this.completedTasks = allItems.filter(item => item.isCompleted); // Completed tasks
    console.log('Completed tasks:', this.completedTasks); // Log completed tasks
  }
  


  deleteItem(id: number) {
    this.itemService.deleteItem(id);
    this.ngOnInit();  // Refresh the list
  }

  toggleComplete(item: Item) {
    console.log(`Checkbox clicked for ${item.name}`); // Log when clicked




    item.isCompleted = !item.isCompleted; // Toggle the completion state
    this.itemService.updateItem(item); // Update in service


    console.log(`New status for ${item.name}: ${item.isCompleted}`); // Log new status
  }


  

  navigateToAdd() {
    this.navCtrl.navigateForward('/add');
  
  }

  navigateToEdit(id: number) {
    this.navCtrl.navigateForward(`/edit/${id}`);
  }
}
