import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../Models/project';
import { ProjectService } from '../../services/create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projectList: Project[] = [];
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Load projects and tasks after initialization
    this.loadProjectsAndTasks();
  }

  // Fetch projects and tasks from backend
  loadProjectsAndTasks(): void {
    this.projectService.getAllProjectsAndTasks().subscribe(
      (projects: Project[]) => {
        console.log('Projects fetched:', projects); // Log the response to check its structure
        this.projectList = projects;
      },
      (error) => {
        console.error('Error loading projects and tasks', error);
      }
    );
  }
  

  // Add a new project
  addProject(): void {
    if (this.projectForm.valid) {
      const newProject: Project = {
        projectName: this.projectForm.get('name')?.value,
        projectDescription: this.projectForm.get('description')?.value
      };

      this.projectService.addProject(newProject).subscribe(
        (project: Project) => {
          this.projectList.push(project); // Update the list with the new project
          this.projectForm.reset(); // Reset form fields
          this.toggleModal(); // Close modal after adding project
        },
        (error) => {
          console.error('Error adding project', error);
        }
      );
    }
  }

  // Toggle modal visibility
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  // Optionally, delete a project (uncomment when needed)
  // deleteProject(index: number, projectId: number): void {
  //   if (index > -1) {
  //     this.projectService.deleteProject(projectId).subscribe(
  //       () => {
  //         this.projectList.splice(index, 1); // Remove the project from the list
  //       },
  //       (error) => {
  //         console.error('Error deleting project', error);
  //       }
  //     );
  //   }
  // }
}
