import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDataTable'
})
export class PipeDataTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    //console.log('pipe value=', value);
    let arr1 = [];
    for(let result of value){
      for(let item in result){
          let arr1 = result[item];
         
          if(typeof(result[item]) == "object" ){
            
            if(arr1 != null && arr1.length >= 1){
                let displayString = "";
                for(let i of arr1){
                  displayString += i.name+',';
                }
                result[item]=displayString;
            }
          }
        }
      }

      //console.log('return value=', value);
      return value;
    }

}
