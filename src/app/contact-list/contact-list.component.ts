import { Component, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IContact } from '../model/IContact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe , RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export default class ContactListComponent {
  private contactService = inject(ContactService);
  contacts: IContact[] = [];


  ngOnInit() {
    this.contactService.list().subscribe((data: IContact[]) => {
      this.contacts = data;

    });
  }

  deleteContact(contact: IContact) {
    this.contactService.delete(contact.id).subscribe(() => {
      this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    });
  }
}
