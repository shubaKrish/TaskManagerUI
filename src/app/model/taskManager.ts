import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { Parent } from 'src/app/model/parent';

export class TaskManager{
  public taskId: number;
  public parentId: number;
  public task: String;
  public priority:number;
  public parent: Parent;
  public startDate:Date;
  public endDate: Date;
  public projectId: number;
  public user: User;
}