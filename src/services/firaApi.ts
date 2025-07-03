
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
  console.log("Using test data instead of API call");
  console.log('File:', file.name, 'Payment Method:', paymentMethod);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock test data
  const mockResult: FiraProcessingResult = {
    success: true,
    message: "FIRA document processed successfully (test data)",
    processingTimeMs: 2000,
    errors: [],
    firaData: {
      id: 1,
      amount: 5000,
      currency: 'USD',
      inrAmount: 425950,
      fxRateSkydo: 86.09,
      calculatedExchangeRate: 85.19,
      transactionSkydoFee: 150,
      skydoFiraFee: 0,
      skydoWireFee: 0,
      platformFiraFee: 2500,
      platformWireFee: 1500,
      platformTransactionFee: 850,
      finalInrAmount: 421100,
      finalInrAmountSkydo: 425800,
      valueDate: new Date().toISOString().split('T')[0]
    }
  };
  
  console.log('Returning mock data:', mockResult);
  return mockResult;
};
