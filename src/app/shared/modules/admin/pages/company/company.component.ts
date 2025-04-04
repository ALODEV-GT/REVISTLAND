import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';
import { ChargePeriodAdDto } from '@shared/modules/announcer/models/charge-period-ad.interface';
import { TypeAd } from '@shared/modules/announcer/models/type-ad.enum';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';
import { ReportService } from '../../services/report.service';
import { ConfigurationDto, UpdateCostHidingAdDayDto, UpdateCostMagazineDayDto } from '../../models/configuration.interface';

@Component({
  selector: 'app-company',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ModalMsgComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {

  @ViewChild('modal1') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;

  // injection servicies
  private readonly _announcerService = inject(AnnouncerService)
  private formBuilder = inject(FormBuilder)
  private readonly _reportService = inject(ReportService)

  msgModal = ''
  titleModal = ''
  clasModalOk = 'text-purple-700 text-lg'
  classModaldErro = 'text-red-700 text-lg'

  cost = 0;
  price = 0;
  configurationDto!: ConfigurationDto;


  TypeAd = TypeAd;

  postForm: FormGroup = this.formBuilder.group({
    cost: [0, [Validators.required]],
    duration: [1, [Validators.required]],
    typeAd: [this.TypeAd.TEXT, Validators.required]
  });


  chargePeriodAds: ChargePeriodAdDto[] = [];
  daysDuration: number[] = [];


  ngOnInit() {
    this.getAllChargePeriodAd();
    this.getConfiguration();

    this.postForm.get('duration')?.valueChanges.subscribe((newValue) => {
      this.calcCost(newValue, this.postForm.value.typeAd);
    });

    this.postForm.get('typeAd')?.valueChanges.subscribe((newValue) => {
      this.calcCost(this.postForm.value.duration, newValue);
    });
  }

  update() {
    this.titleModal = ''
    this.msgModal = ''
    if (this.postForm.get('cost')?.value < 0) {
      return
    }
    const changeUpdate = this.findChargePeriodAd(this.postForm.value.duration, this.postForm.value.typeAd)
    if (!changeUpdate) {
      return
    }

    changeUpdate.cost = this.postForm.get('cost')?.value

    this._reportService.updateChanrgePeriod(changeUpdate, Number(changeUpdate.id)).subscribe({
      next: value => {
        this.titleModal = 'Periodo actulizado con exito'
        this.msgModal = 'El precio del periodo segun el tipo de anuncio se ha actulizado'
        this.modalRef.nativeElement.showModal();
      },
      error: err => {
        this.titleModal = 'Periodo actulizado fallido'
        this.msgModal = 'El precio del periodo segun el tipo de anuncio no se ha actulizado, intente mas tarde'
        this.modalRef2.nativeElement.showModal()
      }
    })

  }

  getUniqueDurations(periods: ChargePeriodAdDto[]): number[] {
    return [...new Set(periods.map(p => p.durationDays))];
  }

  getAllChargePeriodAd() {
    this._announcerService.getAllChargePeriodAd().subscribe({
      next: value => {
        this.chargePeriodAds = value;
        this.daysDuration = this.getUniqueDurations(this.chargePeriodAds)
        this.calcCost(this.postForm.value.duration, this.postForm.value.typeAd)
      }
    })
  }

  calcCost(duration: number, typeAd: TypeAd) {
    const durationNumber = Number(duration)
    this.postForm.patchValue({
      cost: this.findChargePeriodAd(durationNumber, typeAd)?.cost || 0
    });

  }

  getEnumKey(value: string): string | undefined {
    return Object.keys(TypeAd).find(key => TypeAd[key as keyof typeof TypeAd] === value);
  }

  findChargePeriodAd(duration: number, typeAd?: TypeAd): ChargePeriodAdDto | undefined {
    if (!typeAd) {
      return undefined;
    }

    const adType = this.getEnumKey(typeAd)
    const durationNumber = Number(duration)
    return this.chargePeriodAds.find(charge => charge.adType === adType && charge.durationDays === durationNumber)
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

  getConfiguration() {
    this._reportService.getConfiguration().subscribe({
      next: value => {
        this.configurationDto = value
        this.price = this.configurationDto.costHidingAdDay;
        this.cost = this.configurationDto.costMagazineDay;
      }
    })
  }

  updateCostHidingAdDayConfiguration() {

    this.titleModal = ''
    this.msgModal = ''
    if (this.price < 0) {
      return
    }

    const update: UpdateCostHidingAdDayDto = {costHidingAdDay:this.price}
    this._reportService.updateCostHidingAdDayConfiguration(update, this.configurationDto.id).subscribe({
      next: value =>{
        this.titleModal = 'Precio actulizado con exito'
        this.msgModal = 'Precio de ocultacion de anuncio por dia actulizado'
        this.modalRef.nativeElement.showModal()
      },
      error: err =>{
        this.titleModal = 'Actualizacion de precio fallida'
        this.msgModal = 'Precio de ocultacion de anuncio por dia no se ha actulizado'
        this.modalRef2.nativeElement.showModal()

      }
    })
  }

  updateCostMagazineDayConfiguration() {

    this.titleModal = ''
    this.msgModal = ''
    if (this.cost < 0) {
      return
    }

    const update: UpdateCostMagazineDayDto = {costMagazineDay:this.cost}
    this._reportService.updateCostMagazineDayConfiguration(update, this.configurationDto.id).subscribe({
      next: value =>{
        this.titleModal = 'Costo actulizado con exito'
        this.msgModal = 'Costo por almacenamiento de revistas ha sido actualizado'
        this.modalRef.nativeElement.showModal()
      },
      error: err =>{
        this.titleModal = 'Actualizacion de costo fallida'
        this.msgModal = 'Costo por almacenamiento de revistas no ha sido actualizado, intente mas tarde'
        this.modalRef2.nativeElement.showModal()

      }
    })
  }


}
