import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from '../../validators/regex';
import { nospacebar } from '../../validators/nospace';
import { COUNTRIES_META_DATA } from '../../const/contries';
import { Icountry } from '../../model/country';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  countryArr: Array<Icountry> = COUNTRIES_META_DATA
  userForm !: FormGroup
  genderArr: Array<string> = ['male', 'female', 'other']
  constructor() { }

  ngOnInit(): void {
    this.createForm()
    this.isAddSame()
    this.patchValue()
    this.onAddSkill()
    this.passwordHandler()
    this.confirmpassHandler()
  }

  createForm() {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(CustomRegex.username), nospacebar.npspace, Validators.minLength(5), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.pattern(CustomRegex.email), nospacebar.npspace, Validators.minLength(5), Validators.maxLength(20)]),
      gender: new FormControl('male', [Validators.required]),
      emplId: new FormControl('', [Validators.required, nospacebar.npspace, Validators.pattern(CustomRegex.employeeid)]),

      cAddress: new FormGroup({
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', [Validators.required,Validators.pattern(CustomRegex.pincode)])
      }),

      check: new FormControl({ value: null, disabled: true }),

      pAddress: new FormGroup({
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', [Validators.required, Validators.pattern(CustomRegex.pincode)])
      }),
      skills: new FormArray([]),

      dependent: new FormArray([
        new FormGroup({
          fname: new FormControl('', Validators.required),
          lname: new FormControl('', Validators.required),
          relation: new FormControl('', Validators.required),
        })
      ]),

      password: new FormControl('', [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmpassword: new FormControl({ value: null, disabled: true })

    })
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.getRawValue);
      console.log(this.userForm);
      this.userForm.reset()
    }
  }

  onFormReset() {
    this.userForm.reset()
  }

  onAddDependent() {
    if (this.depArr.length < 3) {
      let dependent = new FormGroup({
        fname: new FormControl('', Validators.required),
        lname: new FormControl('', Validators.required),
        relation: new FormControl('', Validators.required),
      })
      this.depArr.push(dependent)
    }
  }

  onRemoveDependent(i: number) {
    this.depArr.removeAt(i)
  }

  passwordHandler() {
    this.f['password'].valueChanges.subscribe(res => {
      if (this.f['password'].valid) {
        this.f['confirmpassword'].enable()
      } else {
        this.f['confirmpassword'].disable()
      }
    })
  }

  confirmpassHandler() {
    this.f['confirmpassword'].valueChanges.subscribe(res => {
      if (this.f['password'].value === this.f['confirmpassword'].value) {
        this.f['confirmpassword'].setErrors(null)
      } else {
        this.f['confirmpassword'].setErrors({
          passMissMatch: true
        })
      }
    })
  }


  onRemoveSkill(i: number) {
    this.skillArr.removeAt(i)
  }
  onAddSkill() {
    let skillControl = new FormControl('', Validators.required)
    this.skillArr.push(skillControl)
  }

  isAddSame() {
    this.f['cAddress'].valueChanges.subscribe(res => {
      if (this.f['cAddress'].valid) {
        this.f['check'].enable()
      } else {
        this.f['check'].disable()
        this.f['check'].reset()
        this.f['pAddress'].enable()
        this.f['pAddress'].reset()
      }
    })
  }

  patchValue() {
    this.f['check'].valueChanges.subscribe(res => {
      if (res) {
        let val = this.f['cAddress'].value
        this.f['pAddress'].patchValue(val)
        this.f['pAddress'].disable()
      } else {
        this.f['pAddress'].enable()
        this.f['pAddress'].reset()
      }
    })
  }

  get f() {
    return this.userForm.controls
  }

  get cAddress() {
    return this.f['cAddress'] as FormGroup
  }

  get skillArr() {
    return this.f['skills'] as FormArray
  }

  get depArr() {
    return this.f['dependent'] as FormArray
  }
}
