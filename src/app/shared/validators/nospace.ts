import { AbstractControl, ValidationErrors } from "@angular/forms";


export class nospacebar {
    static npspace(controls:AbstractControl) : ValidationErrors | null{
        let val = controls.value
        if(!val){
            return null
        }
        if(val.includes(' ')){
            return { 
                'spaceErr' : `spacebar is not allowed`
            }
        }else{
            return null
        }
    }
}