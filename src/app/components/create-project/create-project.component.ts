import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';




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

  
  projectList: Array<{name: string, description: string}> = [];

  constructor() {}

  
  createProject() {
   
    if (this.newProject.name && this.newProject.description) {
      
      this.projectList.push({ 
        name: this.newProject.name, 
        description: this.newProject.description 
      });

      
      this.newProject.name = '';
      this.newProject.description = '';
    }
  }
}
