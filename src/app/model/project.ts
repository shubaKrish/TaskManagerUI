import { User } from 'src/app/model/user';
export class Project{
  public projectId: number;
  public project: String;
  public priority: number;
  public startDate: Date;
  public endDate: Date;
  public manager: String;
  public user: User;
}