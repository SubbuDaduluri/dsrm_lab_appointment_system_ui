import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject } from 'rxjs';
import { State } from '../../../core/models/state.mode';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LabService } from '../../../shared/services/lab.service';
import { AppCommomModule } from '../../../shared/app.common.module';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLabResponse } from '../../../core/models/app.lab.response';
import { UploadFormComponent } from '../../../shared/components/upload-form/upload-form.component';
import { AdressLatLng, GoogleMapPickerComponent } from '../../../shared/components/google-map-picker/google-map-picker.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-lab',
  standalone: true,
  imports: [AppCommomModule,
    UploadFormComponent,
    GoogleMapPickerComponent,
    MatCheckboxModule
  ],
  templateUrl: './add-lab.component.html',
  styleUrl: './add-lab.component.scss'
})
export class AddLabComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  imagesFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = true;

  selectedMpLocation: any ='';

  submitted = false;
  labInformationForm!: FormGroup;
  statesList: any = [];
  countryList: any = [];
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;
  @ViewChild('labInformationForm', { static: true }) labFormSelector: NgForm | undefined;
  isFormSubmitted = false;
  breakpoint: number | undefined;

  filterControlState: FormControl = new FormControl();
  filteredList: State[] = [];
  filteredSearch: ReplaySubject<State[]> = new ReplaySubject<State[]>(1);
  isAddMode: boolean = true;
  labInfoId: number = 0;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private labService: LabService,
    private toastrService: ToastrService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.labInfoId = this.router.getCurrentNavigation()?.extras.state?.['labId'];
    if (this.labInfoId == undefined || this.labInfoId == 0) {
      this.isAddMode = true;
    } else {
      this.isAddMode = false;
    }
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.http.get('json/states.constants.json').subscribe((res) => {
      this.statesList = res;
      this.filteredSearch.next(this.statesList);
    });
    this.http.get('json/country.constatnts.json').subscribe((res) => {
      this.countryList = res;
    });
    this.intializeLabForm();

    this.filterControlState
      .valueChanges
      .subscribe({
        next: () => {
          let filterValue = this.filterControlState.value.toLowerCase();
          this.filteredList = this.statesList.filter(
            (state: any) => state.name.toLowerCase().indexOf(filterValue) >= 0
          );
          this.filteredSearch.next(this.filteredList);
        }
      });

      if(!!this.labInfoId){
        this.labService.find(this.labInfoId).subscribe({
          next: (res: any) => {
            this.updateFormData(res.data);
          },
          error: error => {
          }
        });
      }
   
  }

  intializeLabForm() {
    this.labInformationForm = this.formBuilder.group({
      labName: ['', [Validators.required]],
      contactNumber: ['', Validators.required],
      emailId: ['', [
        Validators.required,
        Validators.email
      ]],
      ownerFullName: ['', Validators.required],
      ownerContactNo: [''],
      latitude : ['', Validators.required],
      longitude : ['', Validators.required],
      addressline1: [''],
      addressline2: ['', Validators.required],
      landmark: [''],
      cityName: ['', Validators.required],
      stateCode: ['', Validators.required],
      countryCode: ['IN', Validators.required],
      mapLocation: [''],
      zipCode: ['', [
        Validators.required
      ]],
      sameAsOwnerNo : true
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.labInformationForm.controls;
  }

  createLab() {
    this.validateForm();
    this.submitted = true;
    if (this.labInformationForm.invalid) {
      this.toastrService.warning('Kindly fill the mandatory fields.', 'Validation', {
        timeOut: 3000,
      });
      return;
    }
    this.labInformationForm.patchValue({
      mapLocation : this.selectedMpLocation 
    });
    this.labService.create(this.labInformationForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Lab Details Added Successfully.', 'Lab Details', {
          timeOut: 3000,
        });
        this.clearForm();
      },
      error: error => {
        this.toastrService.error('Something went wrong. Please try again.', 'Login Details', {
          timeOut: 3000,
        });
        this.isFormSubmitted = false;
      }
    });
  }

  cancel() {
  //  if (!this.isAddMode) {
      this.router.navigate(['/home/labs/view-lab']);
   // }
  }

  clearForm() {
    this.isFormSubmitted = false;
    this.submitted = false;
    this.labInformationForm.reset();
    this.intializeLabForm();
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 800 && event.target.innerWidth > 600) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else {
      this.breakpoint = 3;
    }
  }

  validateForm() {
    Object.keys(this.labInformationForm.controls).forEach(field => {
      const control = this.labInformationForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  updateFormData(data: AppLabResponse) {
    this.labInformationForm.patchValue(data);
  }

  updateLab() {
    this.validateForm();
    this.submitted = true;
    if (this.labInformationForm.invalid) {
      this.toastrService.warning('Kindly fill the mandatory fields.', 'Validation', {
        timeOut: 3000,
      });
      return;
    }
    this.labInformationForm.patchValue({
      mapLocation : this.selectedMpLocation 
    });
    this.labService.update(this.labInfoId, this.labInformationForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Lab Details Updated Successfully.', 'Lab Details', {
          timeOut: 3000,
        });
        this.clearForm();
        this.router.navigate(['/home/labs/view-lab']);
      },
      error: error => {
        this.toastrService.error('Something went wrong. Please try again.', 'Login Details', {
          timeOut: 3000,
        });
        this.isFormSubmitted = false;
      }
    });

  }
  nextLabInfoForm(){
    console.log( this.labInformationForm.value);
    if (this.labInformationForm.invalid) {
      this.toastrService.warning('Kindly fill the mandatory fields.', 'Validation', {
        timeOut: 3000,
      });
      return;
    }
  }

  setAddress(eventData: AdressLatLng){

    let lat = eventData?.latitude;
    let lng =  eventData?.longitude;
    lat = parseFloat(lat!.toFixed(7));
    lng = parseFloat(lng!.toFixed(7));
    this.labInformationForm.patchValue({
      addressline1 : eventData.houseNo,
      cityName : eventData.city,
      zipCode : eventData.postal_code,
      addressline2 : eventData.street,
      longitude : lng,
      latitude : lat,
      stateCode : eventData.state,
      mapLocation : eventData.mapLocation
    });
    this.selectedMpLocation = eventData.mapLocation;
    let matchedState = this.statesList.find((state: any) => state?.name == eventData.state );

    this.labInformationForm.patchValue({
      stateCode : matchedState?.code
    });

  }

  validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  nextStep(stepper: any, formGroup: FormGroup): void {
    this.validateFormGroup(formGroup);
    if (formGroup.valid) {
      stepper.next();
    }
  }

}

