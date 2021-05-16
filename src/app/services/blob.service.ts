import { Injectable } from '@angular/core';
import { File, FileEntry} from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor(private file: File) { }

  /**
   *
   * @param dataURI in the form of "data:image/png;base64,sfs...fsfsd=="
   * @returns A blob file
   */
  public dataURItoBlob(dataURI) {
    console.log("convert base64 to raw binary data held in a string");
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }

  public getContentType(base64Data: any) {  
    let block = base64Data.split(";");  
    let contentType = block[0].split(":")[1];  
    return contentType;  
  } 
  
  /**
   * 
   * @param dataURI in the form of "data:image/png;base64,sfs...fsfsd=="
   * @param folderName string data type
   * @param fileName string in form of <filename>.<image extention>
   * @returns Promise<FileEntry> 
   */

  public async writedataURItoFileAsync(dataURI: any, folderName: string, fileName: any): Promise<FileEntry> {  
    
    let DataBlob = this.dataURItoBlob(dataURI);  
   
    let filePath = this.file.externalDataDirectory + folderName;  // Issue: This folder is not automatically created Need to remove this

    try{
      let fileEntry : FileEntry = await this.file.writeFile(filePath, fileName, DataBlob, {replace: true, append: false});
      return fileEntry;
    }catch(err){

      console.log("Error Occured While Writing File", err); 
      this.file.createFile(filePath,fileName,true).then(async FileEntry => {
        let fileEntry : FileEntry = await this.file.writeFile(filePath, fileName, DataBlob, {replace: true, append: false});
        return fileEntry;
      })
    } 
}


}
