import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TypeAd } from '../../models/type-ad.enum';
import { ChargePeriodAdDto } from '../../models/charge-period-ad.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdPostDto } from '../../models/ad-post-dto.interface';
import { ModalMsgComponent } from '../../components/modal-msg/modal-msg.component';
import { Router } from '@angular/router';
import { SlugService } from '../../services/slug.service';
import { YouTubePlayerModule } from "@angular/youtube-player";

@Component({
  selector: 'app-post-ad',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ModalMsgComponent, YouTubePlayerModule],
  templateUrl: './post-ad.component.html',
  styleUrl: './post-ad.component.scss'
})
export class PostAdComponent {

  @ViewChild('modal1') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;

  // injection servicies
  private readonly _announcerService = inject(AnnouncerService)
  private formBuilder = inject(FormBuilder)
  private readonly route = inject(Router)
  private readonly slugSevice = inject(SlugService)

  //forms
  postForm: FormGroup = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]],
    url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*(\?[^\s]*)?(#[^\s]*)?$/)]],
    duration: [1, [Validators.required]]
  }); 


  viewCarts = true;
  typeAd?: TypeAd;
  TypeAd = TypeAd;
  errorMessage: string = '';
  errorMessageModal: string = '';
  videoId: string = '';

  chargePeriodAds: ChargePeriodAdDto[] = [];
  cost!: number;
  daysDuration: number[] = [];

  playerVars = {
    autoplay: 1,  
    loop: 1,     
    modestbranding: 1, 
    mute: 1,
    showinfo: 0,  
    rel: 0 
  };

  constructor() { }

  ngOnInit() {
    this.getAllChargePeriodAd()

    this.postForm.get('duration')?.valueChanges.subscribe((newValue) => {
      this.calcCost(newValue);
    });

    this.postForm.get('url')?.valueChanges.subscribe((newValue) => {
      this.videoId = this.getYouTubeId(newValue);
    });

  }

  getYouTubeId(url: string): string | '' {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  validateURL(url: string): boolean {
    const pattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*(\?[^\s]*)?(#[^\s]*)?$/;
    return pattern.test(url);
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

  isEmbeddedVideo(url: string): boolean {
    return /youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/\d+/.test(url);
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg|mov|avi|flv|mkv)$/i.test(url) || this.isEmbeddedVideo(url);
  }

  isTypeUrl(url: string): boolean {

    if (this.TypeAd.TEXT === this.typeAd) {
      return true;
    }

    if (this.TypeAd.VIDEO === this.typeAd && this.isVideo(this.postForm.value.url)) {
      return true;
    }

    if (this.TypeAd.TEXT_IMAGE === this.typeAd && this.isImage(this.postForm.value.url)) {
      return true;
    }

    return false;
  }

  adPost() {
    this.errorMessage = '';

    if (this.TypeAd.TEXT === this.typeAd) {
      this.postForm.patchValue({ url: 'https://ejemplo' });
    }

    if (this.TypeAd.VIDEO === this.typeAd) {
      this.postForm.patchValue({ content: '---------------' });
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

    if (!this.isTypeUrl(this.postForm.value.url)) {
      this.errorMessage = 'El url no es del tipo de anuncio que intenta publicar';
      return
    }

    const ad: AdPostDto = {
      content: this.postForm.value.content,
      imageUrl: this.postForm.value.url,
      videoUrl: this.postForm.value.url,
      chargePeriodAd: this.findChargePeriodAd(this.postForm.value.duration, this.typeAd)?.id || 0
    };

    this.createdAd(ad);

  }

  handleError(message: string) {

    this.errorMessageModal = message;

    this.modalRef2.nativeElement.showModal();
  }

  createdAd(adPost: AdPostDto) {
    this._announcerService.createAd(adPost).subscribe({
      next: value => {
        this._announcerService.ad = value;
        this.modalRef.nativeElement.showModal();
        this.modalRef.nativeElement.addEventListener('close', () => {
          const slug = this.slugSevice.generateSlug(value.createdAt.toString());
          this.route.navigate([`announcer/my-ad/${slug}`]);
        }, { once: true });
      },
      error: err => {
        this.handleError(err.error.message)
      }
    });
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

  calcCost(duration: number) {
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
