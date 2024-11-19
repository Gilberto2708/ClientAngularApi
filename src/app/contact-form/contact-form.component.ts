import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export default class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private formbuilder = inject(FormBuilder);
  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  public esEdicion = false;

  form?: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.contactService.get(parseInt(id)).subscribe((contact) => {
        this.form = this.fb.group({
          name: [contact.name, [Validators.required]],
          email: [contact.email, [Validators.required, Validators.email]],
        });
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
      });
    }
  }

  onSubmit(): void {
    // Aquí irá la lógica para guardar el contacto

    if(this.form?.invalid){
      return;
    }

    const contact = this.form!.value;

    if (this.esEdicion) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.contactService.update(parseInt(id), contact).subscribe({
          next: (data) => {
            this.router.navigate(['/list']);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }else{
    // Después de guardar, redirigir a la lista
    //this.router.navigate(['/list']); }} else {
    this.contactService.create(contact).subscribe({
      next: (data) => {
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
}
