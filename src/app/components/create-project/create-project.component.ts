import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup; // Definite assignment assertion
  projectList: Project[] = [];
  showModal: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addProject(): void {
    if (this.projectForm.valid) {
      const newProject: Project = this.projectForm.value;
      this.projectList.push(newProject);
      this.projectForm.reset();
      this.toggleModal();
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  deleteProject(index: number): void {
    if (index > -1) {
      this.projectList.splice(index, 1);
    }
  }
}
