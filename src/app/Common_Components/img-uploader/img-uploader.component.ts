import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'img-upload-button',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.scss'],
})
export class ImgUploaderComponent implements OnInit {

  constructor(private imageCompress: NgxImageCompressService, private camera: Camera,
              private webview: WebView,
              private actionSheetController: ActionSheetController, private toastController: ToastController,
              private storage: NativeStorage,
              private base64: Base64) { }

  @Input() includeClearButton = true;
  @Input() previewImage = true;
  @Input() imageNamePrefix = '';

  @Output('onImageNameSet') emitImageName: EventEmitter<string> = new EventEmitter<string>();

  hasImage = false;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  orientation: DOC_ORIENTATION = -1;
  imageNameKey: string = '';

  ngOnInit() {
  }

  async selectImage(event) {
    console.log(event);
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
              text: 'Select from Gallery',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              },
              icon: 'images'
          },
          {
              text: 'Take Photo',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.CAMERA);
              },
              icon: 'camera'
          },
          {
              text: 'Cancel',
              role: 'cancel'
          }
      ],
      mode: 'ios',
      cssClass: 'image-uploading-action-sheet'
  });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {

    const options: CameraOptions = {
      quality: 100,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(async imagePath => {
      console.log('taking image method ran' + imagePath);
      this.imgResultBeforeCompress = this.pathForImage(imagePath);
      this.convertFilePathToBase64String(imagePath).then( res => {
        this.imgResultBeforeCompress = res;
        console.log("img before compress: "+ this.imgResultBeforeCompress);
        let compressedBase64Image: string;
        this.compressFile().then(res => {
          compressedBase64Image = res;
          console.log('New path after compress edited: ' + compressedBase64Image);
          let imageExtension = ((compressedBase64Image.split(',')[0]).split(';')[0]).split('/')[1];
          this.imageNameKey = this.createFileName(imageExtension);
          this.emitImageName.emit(this.imageNameKey);
          this.storage.setItem(this.imageNameKey, compressedBase64Image);
        });

      });
  });

  }

  createFileName(imageExtension: string) {
    let d = new Date(), n = d.getTime(), newFileName = this.imageNamePrefix + '_' + n + '.' + imageExtension;
    return newFileName;
  }


  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  compressFile(): Promise<string>{
    console.log('U ---- ---- ---- ---line 191   Compress method ran');
    return new Promise<string>((resolve, reject) => {
      this.imageCompress.compressFile(this.imgResultBeforeCompress, this.orientation, 75, 50)
          .then( compressedImagePath => {
            console.log('compressing started');
            this.imgResultAfterCompress = compressedImagePath;
            this.hasImage = true;
            resolve(compressedImagePath);
          });
    });
  }

  convertFilePathToBase64String(filePath: string): Promise<string> {
    let base64FileString;
    return new Promise<string>((resolve, reject) => {

      this.base64.encodeFile(filePath).then((base64File: string) => {
        base64FileString = base64File;
        resolve(base64FileString);
      }, (err) => {
        console.log("Error occurred while converting the file path to base64String: ");
        console.log(err);
        reject(err);
      });

    });
  }

  clearImage() {
    this.imgResultAfterCompress = '';
    this.hasImage = false;
    this.emitImageName.emit('');
    if(this.imageNameKey !== ''){
      this.storage.remove(this.imageNameKey);
    }
  }
}
