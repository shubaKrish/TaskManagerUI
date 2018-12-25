import { Pipe, PipeTransform } from '@angular/core';
import { TaskManager } from 'src/app/model/taskManager';
import { Project } from 'src/app/model/project';
import { FormArray, FormGroup, FormControl, AbstractControl, Form } from '@angular/forms';


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

 public transform(items: TaskManager[], input1: Project, searchFlag: boolean): any {
   if (items && items !== undefined && (input1 && input1!=undefined) && searchFlag ) {
    return items.filter(item => { if (input1 && item.projectId=== input1.projectId) {return true;}      
      });
    } else {
      return items;
    }
}

}
