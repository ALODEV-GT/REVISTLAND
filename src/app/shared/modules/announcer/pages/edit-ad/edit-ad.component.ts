import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AdDto, AdPostDto, updateAd } from '../../models/ad-post-dto.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { Router } from '@angular/router';
import { TypeAd } from '../../models/type-ad.enum';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ChargePeriodAdDto } from '../../models/charge-period-ad.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalMsgComponent } from '../../components/modal-msg/modal-msg.component';
import { UploadImgService } from '../../services/upload-img.service';

@Component({
  selector: 'app-edit-ad',
  imports: [YouTubePlayerModule, CommonModule, ReactiveFormsModule, FormsModule, ModalMsgComponent],
  templateUrl: './edit-ad.component.html',
  styleUrl: './edit-ad.component.scss'
})
export class EditAdComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalRef1!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;


  private readonly _announcerService = inject(AnnouncerService)
  private readonly route = inject(Router)
  private formBuilder = inject(FormBuilder)
  private readonly uploadService = inject(UploadImgService)


  postForm!: FormGroup;


  ad!: AdDto
  typeAd!: TypeAd
  TypeAd = TypeAd;
  videoId: string = '';
  errorMessage: string = '';
  errorMessageModal: string = '';
  titleModal: string = '';
  cost!: number;
  file!: File
  formData!: FormData



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
      this.route.navigate(['/announcer'])
    }

    this.getEnumValue(this.ad.changePeriodAd.adType)
    this.getAllChargePeriodAd()

    this.postForm = this.formBuilder.group({
      content: [this.ad.content, [Validators.required, Validators.minLength(8), Validators.maxLength(500)]],
      url: [this.ad.videoUrl, [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*(\?[^\s]*)?(#[^\s]*)?$/)]],
      duration: [this.ad.changePeriodAd.id, [Validators.required]]
    });

    this.calcCost(this.ad.changePeriodAd.id)

    this.postForm.get('duration')?.valueChanges.subscribe((newValue) => {
      this.calcCost(newValue);
    });

    this.postForm.get('url')?.valueChanges.subscribe((newValue) => {
      this.videoId = this.getYouTubeId(newValue);
    });
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

  validateURL(url: string): boolean {
    const pattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*(\?[^\s]*)?(#[^\s]*)?$/;
    return pattern.test(url);
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }

  isEmbeddedVideo(url: string): boolean {
    return /youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/\d+/.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg|mov|avi|flv|mkv)$/i.test(url) || this.isEmbeddedVideo(url);
  }

  isTypeUrl(url: string): boolean {

    if (this.TypeAd.TEXT === this.typeAd) {
      return true;
    }

    if (this.TypeAd.TEXT_IMAGE === this.typeAd) {
      return true;
    }

    if (this.TypeAd.VIDEO === this.typeAd && this.isVideo(this.postForm.value.url)) {
      return true;
    }


    return false;
  }

  async editAd() {
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

    if (!this.isTypeUrl(this.postForm.value.url)) {
      this.errorMessage = 'El url no es del tipo de anuncio que intenta publicar';
      return
    }

    try {
      await this.uplogadImag();

      const updateAd: updateAd = { content: this.postForm.value.content, imageUrl: this.postForm.value.url, videoUrl: this.postForm.value.url }

      this._announcerService.updateAD(updateAd, this.ad.id).subscribe({
        next: value => {
          this.titleModal = 'Actulizacion Exitosa'
          this.errorMessageModal = 'El anuncio a sido actualizado exitosamente'
          this.modalRef1.nativeElement.showModal();
          this.modalRef1.nativeElement.addEventListener('close', () => {
            this.route.navigate([`announcer/my-ads`]);
          }, { once: true });
        },
        error: err => {
          this.titleModal = 'Actualizacion fallida'
          this.errorMessageModal = err.error.message
          this.modalRef2.nativeElement.showModal();
        }
      })
    } catch (error) {
      this.errorMessageModal = 'Ha ocurrido un error al subir la imagen, intente más tarde';
      this.modalRef2.nativeElement.showModal();
    }

  }

  activeted() {
    if (!this.cost) {
      this.errorMessage = 'debe elegir la duracion de vigencia del anuncio'
      return
    }
    const ad: AdPostDto = { chargePeriodAd: this.postForm.value.duration, content: 'sssssss', imageUrl: 'ssssssss', videoUrl: 'sfasfafasdfsdfds' }
    this._announcerService.activetedAnnouncer(ad, this.ad.id).subscribe({
      next: value => {
        this.titleModal = 'Activacion Exitosa'
        this.errorMessageModal = 'El anuncio a sido activado exitosamente, ahora aparecera en la plataforma, se ha realizado el cobro en su cartera digital'
        this.modalRef1.nativeElement.showModal();
        this.modalRef1.nativeElement.addEventListener('close', () => {
          this.route.navigate([`announcer/my-ads`]);
        }, { once: true });
      },
      error: err => {
        this.titleModal = 'Activacion fallida'
        this.errorMessageModal = err.error.message
        this.modalRef2.nativeElement.showModal();
      }
    })

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
          this.route.navigate([`announcer/my-ads`]);
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

  goBack() {
    this.route.navigate(['/announcer/my-ads'])
  }


  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement != null && inputElement.files != null && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.formData = new FormData();
      this.formData.append('file', this.file, this.file.name);
      this.postForm.patchValue({ url: 'https://res.cloudinary.com/ddkp3bobz/image/upload/v1742243659.web' });
    }
  }

  private async uplogadImag(): Promise<void> {
    if (this.formData) {
      try {
        const value = await this.uploadService.saveImg(this.formData).toPromise();
        this.postForm.patchValue({ url: value.url });
      } catch (err) {
        throw new Error('Error en uplogadImag');
      }
    }
  }

}
