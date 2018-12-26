import { User } from 'src/app/model/user';
export class Project{
  public projectId: number;
  public project: String;
  public priority: number;
  public startDate: Date;
  public endDate: Date;
  public manager: String;
  public completedTask:number;
  public totalTask: number;
  public user: User;
}