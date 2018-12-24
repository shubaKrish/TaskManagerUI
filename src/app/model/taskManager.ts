import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';

export class TaskManager{
  public taskId: number;
  public parentId: number;
  public task: String;
  public priority:number;
  public parentTask: String;
  public startDate:Date;
  public endDate: Date;
  public projectId: number;
  public user: User;
}