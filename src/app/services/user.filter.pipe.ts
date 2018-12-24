import { Pipe, PipeTransform } from '@angular/core';
import { TaskManager } from 'src/app/model/taskManager';
import { FormArray, FormGroup, FormControl, AbstractControl, Form } from '@angular/forms';
import { User } from 'src/app/model/user';

@Pipe({
  name: 'userFilter',
  pure: false
})
export class UserFilterPipe implements PipeTransform {

 public transform(items: User[], input1: string): any {
   if (items && items !== undefined && (input1!="" && input1!=undefined) ) {
    if(input1!="" && input1!=undefined){
        input1 = input1.toLowerCase();
    }
    return items.filter(item => { if (input1 && item.firstName.toLowerCase() === input1) {return true;}
    if (input1 && item.lastName.toLowerCase() === input1) {return true;}
    
      });
    } else {
      return items;
    }
}

}
