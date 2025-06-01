import { Request, Response } from 'express';
import { shopifyWebhook } from '../src/index';


// Correct
const functionsTestLib = require('firebase-functions-test'); // <-- PAS les () ici
const testEnv = functionsTestLib(); // <-- les () ici seulement


// ✅ Déclaration d'un type Request avec rawBody obligatoire
interface FirebaseRequest extends Request {
  rawBody: Buffer;
}

// ✅ Mock Firebase Admin SDK
jest.mock('firebase-admin', () => {
  const timestampMock = {
    now: jest.fn(() => 'MOCK_TIMESTAMP'),
  };

  const firestoreMock = {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
      })),
    })),
    batch: jest.fn(() => ({
      set: jest.fn(),
      commit: jest.fn(() => Promise.resolve()),
    })),
  };

  return {
    initializeApp: jest.fn(),
    firestore: Object.assign(() => firestoreMock, { Timestamp: timestampMock }), // ✅ combine la fonction + Timestamp
    default: {
      firestore: Object.assign(() => firestoreMock, { Timestamp: timestampMock }), // ✅ idem ici
    },
  };
});




describe('shopifyWebhook', () => {
  it('✅ enregistre les achats et renvoie les codes', async () => {
    const mockReq: FirebaseRequest = {
      body: {
        customer: { email: 'test@email.com' },
        line_items: [
          { product_id: 123456 },
          { product_id: 789012 },
        ],
      },
      rawBody: Buffer.from(''), // ✅ inclus dans le type FirebaseRequest
    } as unknown as FirebaseRequest;

    const mockJson = jest.fn();
    const mockStatus = jest.fn(() => ({ json: mockJson }));
    const mockRes = { status: mockStatus } as unknown as Response;

    await shopifyWebhook(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        codes: expect.any(Array),
      })
    );
  });
});
