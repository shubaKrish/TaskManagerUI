import { Pipe, PipeTransform } from '@angular/core';
import { TaskManager } from 'src/app/model/taskManager';
import { FormArray, FormGroup, FormControl, AbstractControl, Form } from '@angular/forms';


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

 public transform(items: TaskManager[], input1: string, input2:string, input3:number,input4:number,input5:Date,input6:Date): any {
   if (items && items !== undefined && ((input1!="" && input1!=undefined) || (input2!="" && input2!=undefined)
    || (input3 && input3!=undefined) || (input4 && input4!=undefined) || (input5 && input5!=undefined))) {
    if(input1!="" && input1!=undefined){
        input1 = input1.toLowerCase();
    }
    if(input2!="" && input2!=undefined){
        input2 = input2.toLowerCase();
    }
    return items.filter(item => { if (input1 && item.task.toLowerCase() === input1) {return true;}
      if (input2 && item.parentTask.toLowerCase() === input2) {return true;}
      if (input3 && !input4 && item.priority==input3) {return true;}
      if (input3 && input4 && item.priority>=input3 && item.priority<=input4) {return true;}
      if (!input3 && input4 && item.priority==input4) {return true;}
      if (input5 && !input6 && item.startDate==input5) {return true;}
      if (!input5 && input6 && item.endDate==input6) {return true;}
      if (input5 && input6 && item.startDate>=input5 && item.endDate<=input6) {return true;}
      });
    } else {
      return items;
    }
}

}
