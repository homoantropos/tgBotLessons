import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css']
})

export class MessageEditorComponent implements OnInit {

  messageForm: FormGroup;

  message = '';

  media: File = null;
  mediaSrc: string = '';

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('image') image: ElementRef<HTMLImageElement>;

  loading = false;
  showBeforeVideo = false;
  loadingAllowed = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      capture: ['']
    })
  }

  clickInputFile(event: any): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
      this.stopEvent(event);
    }
  }

  loadFile(event: any): void {
    if(this.mediaSizeIsAllowedToDownload(event.target.files[0])) {
      this.message = 'дозволено завантажувати файли менші 20мегабайт!'
      return
    }

    this.loading = true;
    this.showBeforeVideo = true;
    this.resetEditor();
    this.media = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        this.mediaSrc = reader.result.toString();

        if (this.mediaIsVideo()) {
          setTimeout(
            () => {
              this.video.nativeElement.play().then(
                () => {
                  this.showBeforeVideo = false;
                  const frameWidth = this.video.nativeElement.videoWidth;
                  const frameHeight = this.video.nativeElement.videoHeight;
                  if (frameWidth < frameHeight) {
                    this.video.nativeElement.height = window.innerHeight * 0.7;
                  } else {
                    this.video.nativeElement.width = window.innerWidth * 0.7
                  }
                  this.video.nativeElement.pause();
                }
              )
            }, 0
          );
        }

        if (this.mediaIsImage()) {
          setTimeout(
            () => {
                  const frameWidth = this.image.nativeElement.width;
                  const frameHeight = this.image.nativeElement.height;
                  if (frameWidth < frameHeight) {
                    this.image.nativeElement.height = window.innerHeight * 0.8;
                  } else {
                    this.image.nativeElement.width = window.innerWidth * 0.8
                  }
            }, 0
          );
        }
        this.loading = false;
      }
    }

    reader.readAsDataURL(this.media);
  }

  onSubmit(value: any): void {

  }

  closeEditor(): void {
    this.router.navigate(['main']);
  }

  resetEditor(event?: any): void {
    if (event) {
      this.stopEvent(event);
    }
    this.media = null;
    this.mediaSrc = '';
    this.loadingAllowed = false;
  }

  mediaIsVideo(): boolean {
    return this.media.type.includes('video');
  }

  mediaIsImage(): boolean {
    return this.media.type.includes('image');
  }

  mediaSizeIsAllowedToDownload(media: File): boolean {
    return media.size >= 20971520;
  }

  stopEvent(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
