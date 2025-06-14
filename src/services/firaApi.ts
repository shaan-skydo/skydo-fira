
export interface FiraProcessingResult {
  success: boolean;
  message: string;
  firaData: FiraDataDto | null;
  processingTimeMs: number;
  errors: string[];
}

export interface FiraDataDto {
  id: number;
  amount: number;
  currency: string;
  inrAmount: number;
  fxRateSkydo: number;
  calculatedExchangeRate: number;
  transactionSkydoFee: number;
  skydoFiraFee: number;
  skydoWireFee: number;
  platformFiraFee: number;
  platformWireFee: number;
  platformTransactionFee: number;
  finalInrAmount: number;
  finalInrAmountSkydo: number;
  valueDate: string;
}

export const uploadAndProcessFira = async (
  file: File, 
  paymentMethod: string,
  importerId?: number
): Promise<FiraProcessingResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('paymentMethod', paymentMethod);
  
  if (importerId) {
    formData.append('importerId', importerId.toString());
  }

  try {
    const response = await fetch('https://d81f-106-51-85-199.ngrok-free.app/api/v1/fira/upload', {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: FiraProcessingResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading FIRA file:', error);
    throw error;
  }
};
