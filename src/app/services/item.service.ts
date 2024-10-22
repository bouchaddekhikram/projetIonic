import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Item {
  id: number;
  name: string;
  description: string;
  dueDate: string;  // Add due date for the task
  isCompleted : boolean; // Add task completion status
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: Item[] = [];
  private _storage: Storage | null = null;
  private nextId = 1;

  constructor(private storage: Storage) {
    this.init();
  }

  
  async init() {
    this._storage = await this.storage.create();
    const storedItems = await this._storage.get('items');
    
    console.log('Stored items:', storedItems);  // Log stored items
  
    this.items = storedItems || [];
    if (this.items.length > 0) {
      this.nextId = Math.max(...this.items.map((i) => i.id)) + 1;
    }
  }

  getItems(): Item[] {
    return this.items;
  }

  getItem(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  async addItem(item: Item): Promise<void> {
    item.id = this.nextId++;
    item.isCompleted = false;  // Default task as incomplete
    this.items.push(item);
    await this._storage?.set('items', this.items);  // Save to storage
  }


   updateItem(updatedItem: Item){
    const index = this.items.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    this.items[index] = updatedItem; // Update the item in memory
    this._storage?.set('items', this.items); // Update the items in storage
    console.log(`Updated item in storage:`, updatedItem); // Log the updated item
  }

  }

  async deleteItem(id: number): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
    await this._storage?.set('items', this.items);  // Save to storage
  }
}
