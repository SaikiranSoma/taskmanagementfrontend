import { Component } from '@angular/core';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.css'
})
export class MaindashboardComponent {
  username: string = 'Saikiran';  // This will eventually be replaced by the username from the ASP.NET backend
  newProject = {
    name: '',
    description: ''
  };

  // Function to handle form submission
  createProject() {
    if (this.newProject.name && this.newProject.description) {
      // For now, we'll just log the project info, but you can integrate this with ASP.NET for backend handling
      console.log('New project created:', this.newProject);

      // Reset the form fields
      this.newProject = { name: '', description: '' };
    } else {
      alert('Please fill out all fields.');
    }
  }
}
