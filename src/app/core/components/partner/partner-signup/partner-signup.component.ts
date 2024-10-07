import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { CommonHeaderComponent } from '../../../../shared/components/common-header/common-header.component';
import { AddLabComponent } from '../../../../features/labs/add-lab/add-lab.component';
import { CommonFooterComponent } from '../../../../shared/components/common-footer/common-footer.component';
import { AppCommomModule } from '../../../../shared/app.common.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AdressLatLng, GoogleMapPickerComponent } from '../../../../shared/components/google-map-picker/google-map-picker.component';
import { MatSelect } from '@angular/material/select';
import { map, Observable, ReplaySubject } from 'rxjs';
import { State } from '../../../models/state.mode';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { UploadFormComponent } from '../../../../shared/components/upload-form/upload-form.component';
import { LabService } from '../../../../shared/services/lab.service';
import { AppLabResponse } from '../../../models/app.lab.response';

@Component({
  selector: 'app-partner-signup',
  standalone: true,
  imports: [CommonModule,
    CommonHeaderComponent,
    AddLabComponent,
    CommonFooterComponent,
    AppCommomModule,
    UploadFormComponent,
    MatCheckboxModule,
    GoogleMapPickerComponent
  ],
  templateUrl: './partner-signup.component.html',
  styleUrl: './partner-signup.component.scss'
})
export class PartnerSignupComponent {

  private _formBuilder = inject(FormBuilder);

  imagesFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = true;

  selectedMpLocation: any = '';

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

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private labService: LabService,
    private toastrService: ToastrService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const breakpointObserver = inject(BreakpointObserver);
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
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
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
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
      sameAsOwnerNo: true
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
      mapLocation: this.selectedMpLocation
    });
    this.labService.partnerRegistration(this.labInformationForm.value).subscribe({
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
    this.router.navigate(['/login']);
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

  nextLabInfoForm() {
    console.log(this.labInformationForm.value);
    if (this.labInformationForm.invalid) {
      this.toastrService.warning('Kindly fill the mandatory fields.', 'Validation', {
        timeOut: 3000,
      });
      return;
    }
  }

  setAddress(eventData: AdressLatLng) {

    let lat = eventData?.latitude;
    let lng = eventData?.longitude;
    lat = parseFloat(lat!.toFixed(7));
    lng = parseFloat(lng!.toFixed(7));
    this.labInformationForm.patchValue({
      addressline1: eventData.houseNo,
      cityName: eventData.city,
      zipCode: eventData.postal_code,
      addressline2: eventData.street,
      longitude: lng,
      latitude: lat,
      stateCode: eventData.state,
      mapLocation: eventData.mapLocation
    });
    this.selectedMpLocation = eventData.mapLocation;
    let matchedState = this.statesList.find((state: any) => state?.name == eventData.state);

    this.labInformationForm.patchValue({
      stateCode: matchedState?.code
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

  navigateToLoginPage(){
    this.router.navigate(['/login']);
  }

}
