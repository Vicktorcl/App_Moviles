import { CommonModule } from '@angular/common';
import { Component, ElementRef, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '../language/language.component';
import { addIcons } from 'ionicons';
import { stopCircleOutline, trashOutline, videocamOutline } from 'ionicons/icons';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, TranslateModule]

})
export class CodigoqrComponent  implements OnDestroy {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() scanned: EventEmitter<string> = new EventEmitter<string>();
  @Output() stopped: EventEmitter<void> = new EventEmitter<void>();
 // @Output() qrScanCompleted = new EventEmitter<string>(); // New EventEmitter

 qrData: string = '';
 mediaStream: MediaStream | null = null;

  constructor() 
  {
    this.comenzarEscaneoWeb();
    addIcons ({ stopCircleOutline,videocamOutline, trashOutline })

  }
  
  async comenzarEscaneoWeb() {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = this.mediaStream;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }


  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR()) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      const data = qrCode.data;
      if (data !== ''){
        this.detenerCamara();
        this.scanned.emit(qrCode.data);
        return true;
      }
    }
    
    return false;
  }


  public detenerEscaneoQR(): void {
    this.detenerCamara();
    this.stopped.emit();
  }

  ngOnDestroy(){
    this.detenerCamara();
  }

  detenerCamara(){
    if (this.mediaStream){
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }


}
