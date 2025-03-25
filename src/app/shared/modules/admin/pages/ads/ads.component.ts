import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdDto } from '@shared/modules/announcer/models/ad-post-dto.interface';
import { TypeAd } from '@shared/modules/announcer/models/type-ad.enum';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';
import { SlugService } from '@shared/modules/announcer/services/slug.service';
import { AnnouncersDto } from '../../models/announcer.interface';
import { FormsModule } from '@angular/forms';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-ads',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent {

  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;


  //services
  private readonly _announcerService = inject(AnnouncerService)
  private readonly slugSevice = inject(SlugService)
  private readonly route = inject(Router)

  ads: AdDto[] = [];
  announcersDto:AnnouncersDto[]=[]
  idAnnouncer = 0;

  ngOnInit() {
    this.getAllAds()
    this.getAllAnnouncers()
  }

  getAllAds() {
    this._announcerService.getAllAds().subscribe({
      next: value => {
        this.ads = value
      }
    })
  }

  getAllAnnouncers(){
    this._announcerService.getAllAnnouncers().subscribe({
      next: value =>{
        this.announcersDto = value
      }
    })
  }

  filter(){
    this.idAnnouncer = Number(this.idAnnouncer)
    if (this.idAnnouncer < 0) {
      this.modalRef2.nativeElement.showModal()
      return;
    }

    if(this.idAnnouncer === 0){
      this.getAllAds()
      return;
    }

    this._announcerService.getAllAdsByUserId(this.idAnnouncer).subscribe({
      next: value =>{
        this.ads = value
      }
    })
  }


  editAd(ad: AdDto) {
    this._announcerService.ad = ad;
    const slug = this.slugSevice.generateSlug(ad.createdAt.toString());
    this.route.navigate([`admin/management/ads/disabled-ad/${slug}`]);
  }

  getEnumValue(type: string): TypeAd | undefined {
    return TypeAd[type as keyof typeof TypeAd];
  }

  formatDateTime(date: any): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0] + ' ' + parsedDate.toTimeString().slice(0, 5) + ' hrs';
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

  activeSting(active: boolean) {
    return active ? 'Si' : 'No';
  }

}
