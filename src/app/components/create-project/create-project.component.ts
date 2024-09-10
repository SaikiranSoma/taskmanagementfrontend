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

  projects: Project[] = [];  // Array to hold project data
  showModal: boolean = false;  // Modal visibility state
  projectForm: FormGroup;  // Form for adding new project

  constructor(private fb: FormBuilder) {
    // Initialize form with validation
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Method to toggle modal
  toggleModal() {
    this.showModal = !this.showModal;
  }

  // Method to handle new project creation
  addProject() {
    if (this.projectForm.valid) {
      const newProject: Project = {
        name: this.projectForm.get('name')?.value,
        description: this.projectForm.get('description')?.value
      };
      this.projects.push(newProject);  // Add new project to list
      this.projectForm.reset();  // Reset form
      this.toggleModal();  // Close modal
    }
  }
}