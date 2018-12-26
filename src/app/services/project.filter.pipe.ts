import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/model/project';
import { FormArray, FormGroup, FormControl, AbstractControl, Form } from '@angular/forms';


@Pipe({
  name: 'projectFilter',
  pure: false
})
export class ProjectFilterPipe implements PipeTransform {

 public transform(items: Project[], input1: String): any {
   if (items && items !== undefined && (input1 !='' && input1!=undefined) ) {
    return items.filter(item => { if (input1 && item.project=== input1) {return true;}      
      });
    } else {
      return items;
    }
}

}
