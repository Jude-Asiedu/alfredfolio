import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  status: SendStatus = 'idle';

  form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email:       ['', [Validators.required, Validators.email]],
    message:     ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    'bot-field': ['']
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('About — Jude Asiedu');
    this.meta.updateTag({ name: 'description', content: 'About Jude Asiedu — Senior Full-Stack Developer with 2 years of experience building intuitive, user-centric web experiences.' });
  }

  get f() { return this.form.controls; }

  sendForm(): void {
    if (this.form.value['bot-field']) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status = 'sending';
    this.form.disable();

    const body = new URLSearchParams({
      'form-name': 'contact',
      name:        this.form.value.name ?? '',
      email:       this.form.value.email ?? '',
      message:     this.form.value.message ?? '',
      'bot-field': ''
    }).toString();

    this.http.post('/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.status = 'sent';
        this.form.reset();
        this.form.enable();
      },
      error: () => {
        this.status = 'error';
        this.form.enable();
      }
    });
  }

  resetStatus(): void {
    this.status = 'idle';
  }
}
