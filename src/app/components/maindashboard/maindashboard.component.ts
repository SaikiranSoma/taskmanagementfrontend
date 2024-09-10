import { Component } from '@angular/core';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.css'
})
export class MaindashboardComponent {
  peopleList = [
    { name: 'Perumulateja' },
    { name: 'John Doe' }
  ];

  projectList = [
    { name: 'Testing' },
    { name: 'Task Management' }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Get the initials from the person's name
  getInitials(name: string): string {
    const initials = name.split(' ').map((n) => n[0]).join('');
    return initials.toUpperCase();
  }
}
