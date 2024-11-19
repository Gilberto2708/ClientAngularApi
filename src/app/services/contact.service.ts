import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IContact } from '../model/IContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private http = inject(HttpClient);
  constructor() { }

  list() {
    return this.http.get<IContact[]>('http://localhost:8083/api/getAllContacts');
  }

  get(id: number) {
    return this.http.get<IContact>(`http://localhost:8083/api/getById/${id}`);
  }

  create(contact: IContact) {
    return this.http.post<IContact>('http://localhost:8083/api/create', contact);
  }

  update(id: number, contact: IContact) {
   return this.http.put<IContact>(`http://localhost:8083/api/update/${id}`, contact);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8083/api/delete/${id}`);
  }

}
