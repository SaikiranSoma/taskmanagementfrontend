import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/create-project.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Project } from '../../Models/project';
import { Tasks } from '../../Models/task';

declare var bootstrap: any; 

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  projectId!: number;
  todo: Tasks[] = [];
  inprogress: Tasks[] = [];
  completed: Tasks[] = [];
  projectName: string = '';

  
  newTask: Tasks = {
    taskId: 0,
    taskName: '',
    taskDescription: '',
    dueDate: '',
    status: 'Todo',
    priority: 'High',
    assignedTo: ''
  };

  
  assignees: { employeeName: string; timeZone: string }[] = []; 

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProjectTasks();
    this.loadEmployees();  
  }

 
  loadProjectTasks(): void {
    this.projectService.getAllProjectsAndTasks().subscribe({
      next: (projects: Project[]) => {
        const project = projects.find(p => p.projectId === this.projectId);
        if (project) {
          this.projectName = project.projectName;
          if (project.tasks) {
            project.tasks.forEach(task => {
              const formattedTask: Tasks = {
                taskId: task.taskId, 
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                dueDate: task.dueDate,
                priority: this.mapPriority(task.status),
                status: this.mapStatus(task.status),
                assignedTo: task.assignedTo
              };
  
              if (task.status === 'Todo') {
                this.todo.push(formattedTask);
              } else if (task.status === 'InProgress') {
                this.inprogress.push(formattedTask);
              } else if (task.status === 'Completed') {
                this.completed.push(formattedTask);
              }
            });
          }
        }
      },
      error: (error) => {
        console.error('Error loading project tasks', error);
      },
      complete: () => {
        console.log('Project loading complete');
      }
    });
  }

  
  loadEmployees(): void {
    this.projectService.getEmployeesByProjectId(this.projectId).subscribe({
      next: (employees: { employeeName: string; timeZone: string }[]) => {
        this.assignees = employees; 
        console.log('Employees loaded successfully', this.assignees);
      },
      error: (error) => {
        console.error('Error loading employees', error);
      },
      complete: () => {
        console.log('Employee loading complete');
      }
    });
  }

  
  onAddTask(): void {
    const taskToAdd = {
      TaskName: this.newTask.taskName,
      TaskDescription: this.newTask.taskDescription,
      DueDate: this.newTask.dueDate,
      Status: 0, 
      ProjectId: this.projectId,
      AssignedTo: this.newTask.assignedTo 
    };

    
    this.projectService.addTask(taskToAdd).subscribe({
      next: (response) => {
        console.log('Task added successfully', response);

        
        this.todo.push({
          taskId: response.taskId,
          taskName: this.newTask.taskName,
          taskDescription: this.newTask.taskDescription,
          dueDate: this.newTask.dueDate,
          status: 'Todo', 
          priority: 'High', 
          assignedTo: this.newTask.assignedTo
        });

        
        this.newTask = {
          taskId: 0,
          taskName: '',
          taskDescription: '',
          dueDate: '',
          status: 'Todo',
          priority: 'High',
          assignedTo: ''
        };

        
        const modalElement = document.getElementById('addTaskModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      },
      error: (error) => {
        console.error('Error adding task', error);
      },
      complete: () => {
        console.log('Task addition complete');
      }
    });
  }

  
  mapPriority(status: string): string {
    if (status === 'Todo') return 'High';
    if (status === 'InProgress') return 'Medium';
    if (status === 'Completed') return 'Low';
    return 'High';
  }

  mapStatus(status: string): string {
    if (status === 'Todo') return 'To Do';
    if (status === 'InProgress') return 'In Progress';
    if (status === 'Completed') return 'Completed';
    return 'Unknown';
  }

  
  drop(event: CdkDragDrop<Tasks[]>): void {
    if (!event.previousContainer.data || !event.container.data) {
      console.error('Data for one of the containers is undefined');
      return;
    }

    if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const task = event.container.data[event.currentIndex]; 
      let newStatus = 0; 

     
      if (event.container.id === 'inprogress') {
        newStatus = 1; 
      } else if (event.container.id === 'completed') {
        newStatus = 2; 
      }

      
      task.status = this.mapStatus(newStatus === 0 ? 'Todo' : newStatus === 1 ? 'InProgress' : 'Completed');
      task.priority = this.mapPriority(task.status); 
      
      if (task && task.taskId && this.projectId) {
        const payload = {
          Status: newStatus,
          TaskId: task.taskId
        };

        
        this.projectService.updateTaskStatus(this.projectId, task.taskId, payload).subscribe({
          next: () => {
            console.log('Task status updated successfully');
          },
          error: (error) => {
            console.error('Error updating task status', error);
          }
        });
      } else {
        console.error('Task ID or Project ID is undefined');
      }
    }
  }
}
