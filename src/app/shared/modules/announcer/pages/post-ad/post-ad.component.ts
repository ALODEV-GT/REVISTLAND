import { Component, inject } from '@angular/core';
import { TypeAd } from '../../models/type-ad.enum';
import { ChargePeriodAdDto } from '../../models/charge-period-ad.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdPostDto } from '../../models/ad-post-dto.interface';

@Component({
  selector: 'app-post-ad',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './post-ad.component.html',
  styleUrl: './post-ad.component.scss'
})
export class PostAdComponent {

  // injection servicies
  private readonly _announcerService = inject(AnnouncerService)
  private formBuilder = inject(FormBuilder)

  //forms
  postForm: FormGroup = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]],
    url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/)]],
    duration: [1, [Validators.required]]
  });


  viewCarts = true;
  typeAd?: TypeAd;
  TypeAd = TypeAd;
  errorMessage: string = '';

  chargePeriodAds: ChargePeriodAdDto[] = [];
  cost!: number;
  daysDuration: number[] = [];

  constructor() { }

  ngOnInit() {
    this.getAllChargePeriodAd() 

    this.postForm.get('duration')?.valueChanges.subscribe((newValue) => {
      this.calcCost(newValue);
    });

  }

  validateURL(url: string): boolean {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([\w./?=#-]*)?$/i;
    return pattern.test(url);
  }
  

  getEnumKey(value:string):string | undefined{
    return Object.keys(TypeAd).find(key => TypeAd[key as keyof typeof TypeAd] === value);
  }

  findChargePeriodAd(duration: number, typeAd?: TypeAd): ChargePeriodAdDto | undefined {
    if (!typeAd) {
      return undefined;
    }

    const adType = this.getEnumKey(typeAd)
    const durationNumber = Number(duration)
    return this.chargePeriodAds.find(charge => charge.adType === adType && charge.durationDays === duration)
  }

  adPost() {
    this.errorMessage = '';
  
    if (this.TypeAd.TEXT === this.typeAd) {
      this.postForm.patchValue({ url: 'https://ejemplo' });
    }
  
    if (this.TypeAd.VIDEO === this.typeAd) {
      this.postForm.patchValue({ content: '--' });
    }
  
    this.postForm.markAllAsTouched();
    this.postForm.updateValueAndValidity();
  
  
    if (this.postForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios, asegúrese de llenar los campos correctamente';
      return;
    }    

    if (!this.validateURL(this.postForm.value.url)) {
      this.errorMessage = 'El url debe cumplir con las carracteristcas de un URL'
      return
    }
  
    const ad: AdPostDto = {
      duration: Number(this.postForm.value.duration),
      content: this.postForm.value.content,
      imageUrl: this.postForm.value.url,
      videoUrl: this.postForm.value.url,
      chargePeriodAd: this.findChargePeriodAd(this.postForm.value.duration, this.typeAd)?.id || 0 
    };
  
    this.createdAd(ad);
  }

  createdAd(adPost: AdPostDto) {
    console.log(adPost);
    
  }

  getUniqueDurations(periods: ChargePeriodAdDto[]): number[] {
    return [...new Set(periods.map(p => p.durationDays))];
  }

  getAllChargePeriodAd() {
    this._announcerService.getAllChargePeriodAd().subscribe({
      next: value => {
        this.chargePeriodAds = value;
        this.daysDuration = this.getUniqueDurations(this.chargePeriodAds)        
      }
    })
  }

  conversWeek(daysDuration: number): string {
    if (daysDuration < 7) {
      return `${daysDuration} dia${daysDuration > 1 ? 's' : ''}`;
    }

    const weeks = Math.floor(daysDuration / 7);
    const remainingDays = daysDuration % 7;

    if (remainingDays === 0) {
      return `${weeks} semana${weeks > 1 ? 's' : ''}`;
    }

    return `${weeks} semana${weeks > 1 ? 's' : ''} y ${remainingDays} día${remainingDays > 1 ? 's' : ''}`;
  }

  calcCost(duration:number){
    const durationNumber = Number(duration)
    this.cost = this.findChargePeriodAd(durationNumber, this.typeAd)?.cost || 0
  }

  selectTypeAd(typeAd: TypeAd) {
    this.viewCarts = false;
    this.typeAd = typeAd; 
    this.calcCost(this.postForm.value.duration)   
  }
 
  goCarts() {
    this.viewCarts = true;
  }

}
