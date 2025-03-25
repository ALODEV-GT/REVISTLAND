import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';
import { AdDto, AdPostDto } from '@shared/modules/announcer/models/ad-post-dto.interface';
import { ChargePeriodAdDto } from '@shared/modules/announcer/models/charge-period-ad.interface';
import { TypeAd } from '@shared/modules/announcer/models/type-ad.enum';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';

@Component({
  selector: 'app-disabled-ad',
  imports: [YouTubePlayerModule, CommonModule, ReactiveFormsModule, FormsModule, ModalMsgComponent],
  templateUrl: './disabled-ad.component.html',
  styleUrl: './disabled-ad.component.scss'
})
export class DisabledAdComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalRef1!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;


  private readonly _announcerService = inject(AnnouncerService)
  private formBuilder = inject(FormBuilder)
  private readonly route = inject(Router)


  postForm!: FormGroup;


  ad!: AdDto
  typeAd!: TypeAd
  TypeAd = TypeAd;
  videoId: string = '';
  errorMessage: string = '';
  errorMessageModal: string = '';
  titleModal: string = '';
  cost!: number;


  chargePeriodAds: ChargePeriodAdDto[] = [];
  daysDuration: number[] = [];

  




  playerVars = {
    autoplay: 1,
    loop: 1,
    modestbranding: 1,
    mute: 1,
    showinfo: 0,
    rel: 0
  };


  ngOnInit() {
    this.ad = this._announcerService.ad
    if (!this.ad) {
      this.route.navigate(['/admin/management/ads'])
    }

    this.getEnumValue(this.ad.changePeriodAd.adType)
    this.getAllChargePeriodAd()

    this.videoId = this.getYouTubeId(this.ad.videoUrl);

  }


  getEnumValue(type: string) {
    this.typeAd = TypeAd[type as keyof typeof TypeAd];
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

  calcCost(duration: number) {
    const durationNumber = Number(duration)
    this.cost = this.findChargePeriodAd(durationNumber, this.typeAd)?.cost || 0
  }

  getYouTubeId(url: string): string | '' {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  formatDateTime(date: any): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0] + ' ' + parsedDate.toTimeString().slice(0, 5) + ' hrs';
  }

 
  confirm() {
    const ad: AdPostDto = { chargePeriodAd: 1, content: 'sssssss', imageUrl: 'ssssssss', videoUrl: 'sfasfafasdfsdfds' }
    this._announcerService.desactiveAnnouncer(ad, this.ad.id).subscribe({
      next: value => {
        this.modalRef.nativeElement.close();
        this.titleModal = 'Desactivacion Exitosa'
        this.errorMessageModal = 'El anuncio a sido desactivado exitosamente, ya no aparecera en la plataforma'
        this.modalRef1.nativeElement.showModal();
        this.modalRef1.nativeElement.addEventListener('close', () => {
          this.route.navigate([`admin/management/ads`]);
        }, { once: true });
      },
      error: err => {
        this.titleModal = 'Desactivacion Efallida'
        this.errorMessageModal = 'El anuncio no a sido desactivado, intente mas tarde'
        this.modalRef2.nativeElement.showModal();
      }
    })
  }

  enabled() {
    this.modalRef.nativeElement.showModal();
  }

  closeModal() {
    this.modalRef.nativeElement.close();
  }

}
