import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


interface Project {
  name: string;
  description: string;
}


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
projects: any;
deleteProject(_t28: any) {
throw new Error('Method not implemented.');
}
  
  newProject = {
    name: '',
    description: ''
  };

  // List to store created projects
  projectList: Array<{name: string, description: string}> = [];

  constructor() {}

  // Function to create a new project and add to the list
  createProject() {
    // Check if both name and description are filled
    if (this.newProject.name && this.newProject.description) {
      // Add the new project to the list
      this.projectList.push({ 
        name: this.newProject.name, 
        description: this.newProject.description 
      });

      // Clear the form
      this.newProject.name = '';
      this.newProject.description = '';
    }
  }
}