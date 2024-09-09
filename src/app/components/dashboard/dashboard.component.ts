import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userName = 'Saikiran';  // Dynamic username for the greeting message
  employees = ['John Doe', 'Jane Smith', 'Michael Johnson'];  // Sample employee data

  selectedSection = 'dashboard';  // Default section is dashboard

  projects: Project[] = [];  // Store projects dynamically created by the user
  newProject: Project = { name: '', description: '' };  // For creating new projects
  currentProject: Project | null = null;  // To store the currently selected project

  // Switches sections based on sidebar navigation clicks
  selectSection(section: string) {
    this.selectedSection = section;
  }

  // Handle creating a new project
  createNewProject() {
    this.selectedSection = 'createProject';  // Switch to the Create Project section
  }

  // Save the new project to the projects array
  saveProject() {
    if (this.newProject.name && this.newProject.description) {
      this.projects.push({ ...this.newProject });
      this.newProject = { name: '', description: '' };  // Reset the form after saving
      this.selectedSection = 'myProjects';  // Go to My Projects section after saving
    } else {
      alert('Please enter both project name and description.');
    }
  }

  // Handle viewing an individual project
  viewProject(project: Project) {
    this.currentProject = project;  // Set the current project
    this.selectedSection = 'projectBoard';  // Switch to the Project Task Board section
  }

  // Sign out method
  signOut() {
    // Implement sign-out logic here
    alert('Signing out...');
  }
}
