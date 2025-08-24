import { Injectable } from "@angular/core";
import imageCompression from "browser-image-compression";

@Injectable({
    providedIn: 'root',
})
export class FileCompressService {

    async compressImage(
        file: File,
        maxSizeKB: number = 1,         // default 1MB
        maxWidthOrHeight: number = 512 // default 512px
    ): Promise<File> {
        const maxSizeMB = maxSizeKB / 1024;
        const options = {
            maxSizeMB,
            maxWidthOrHeight,
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            console.log(
                `Original: ${(file.size / 1024 / 1024).toFixed(2)} MB → Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
            );
            return compressedFile;
        } catch (error) {
            console.error("Image compression failed:", error);
            return file; // fallback to original if compression fails
        }
    }
}
