import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  #db: FirebaseFirestore.Firestore;
  #collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#collection = this.#db.collection('voting_qr_code');
  }

  /**
   * Uploads QR code data to Firestore.
   * @param fileId Unique identifier for the QR code.
   * @param buffer Buffer containing QR code image data.
   * @param contentType MIME type of the QR code image.
   */
  async uploadFileToFirestore(
    fileId: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<void> {
    const fileData = buffer.toString('base64');
    await this.#collection.doc(fileId).set({
      data: fileData,
      contentType,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  /**
   * Retrieves QR code data from Firestore.
   * @param fileId Unique identifier for the QR code.
   * @returns An object containing the base64 data and content type.
   */
  async getFileFromFirestore(
    fileId: string,
  ): Promise<{ data: string; contentType: string }> {
    const doc = await this.#collection.doc(fileId).get();
    if (!doc.exists) {
      throw new Error('File not found');
    }
    return doc.data() as { data: string; contentType: string };
  }
}
