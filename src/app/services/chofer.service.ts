import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from './db.service';
import { Chofer } from '../models/chofer';
@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  private collectionName: string = "chofer";
  constructor(private _db: DbService) {}

  addChofer(data: Chofer){
    return this._db.addOne(this.collectionName, data);
  }

  getOneChofer(uuid:string){
    return  this._db.getOne(this.collectionName, uuid);
  }

  getAllSnapshots(): Observable<Chofer[]> {
    return this._db.getAllSnapshot<Chofer>(this.collectionName);
  }
}
