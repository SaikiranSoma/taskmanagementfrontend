import { Component } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  projectName: string = '';
  projectCreated: boolean = false;

  onSubmit() {
    if (this.projectName) {
      this.projectCreated = true;
      console.log('Project Created:', this.projectName);
    }
  }
}
