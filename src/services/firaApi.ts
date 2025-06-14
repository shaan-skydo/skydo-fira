
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
  console.log("uploadAndProcessFira");
  // Build URL with query parameters
  const baseUrl = 'https://d81f-106-51-85-199.ngrok-free.app/api/v1/fira/upload';
  const params = new URLSearchParams();
  params.append('paymentMethod', paymentMethod);
  
  if (importerId) {
    params.append('importerId', importerId.toString());
  }
  
  const urlWithParams = `${baseUrl}?${params.toString()}`;
  
  console.log('Starting API call to:', urlWithParams);
  console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
  console.log('Payment Method:', paymentMethod);
  console.log('Importer ID:', importerId);

  const formData = new FormData();
  formData.append('file', file);

  console.log('FormData prepared (file only), making fetch request...');

  try {
    const response = await fetch(urlWithParams, {
      method: 'POST',
      body: formData,
    });

    console.log('Response received:', response.status, response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result: FiraProcessingResult = await response.json();
    console.log('API response parsed successfully:', result);
    return result;
  } catch (error) {
    console.error('Fetch error details:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Re-throw with more context
    throw new Error(`Failed to upload FIRA file: ${error instanceof Error ? error.message : 'Network error'}`);
  }
};
