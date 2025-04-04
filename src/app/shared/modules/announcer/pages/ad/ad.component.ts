import { Component, Input, inject } from '@angular/core';
import { AdDto } from '../../models/ad-post-dto.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { Router } from '@angular/router';
import { TypeAd } from '../../models/type-ad.enum';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-ad',
  imports: [YouTubePlayerModule],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.scss'
})
export class AdComponent {

  private readonly _announcerService = inject(AnnouncerService)
  private readonly route = inject(Router)

  ad: AdDto = this._announcerService.ad
  TypeAd = TypeAd;
  videoId: string = '';

  playerVars = {
    autoplay: 1,  
    loop: 1,     
    modestbranding: 1, 
    mute: 1,
    showinfo: 0,  
    rel: 0 
  };


  ngOnInit() {
    if (!this.ad) {
      this.route.navigate(['/announcer'])
    }
    this.videoId = this.getYouTubeId(this.ad.videoUrl);
  }

  getEnumValue(type: string): TypeAd | undefined {
    return TypeAd[type as keyof typeof TypeAd];
  }

  getYouTubeId(url: string): string | '' {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }



}
