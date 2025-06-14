
import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ComparisonResults } from "@/components/ComparisonResults";
import { AnimatedHeaderText } from "@/components/AnimatedHeaderText";
import { LoadingStages } from "@/components/LoadingStages";
import { motion } from "framer-motion";
import { uploadAndProcessFira, FiraProcessingResult } from "@/services/firaApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File, paymentMethod: string) => {
    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      const result: FiraProcessingResult = await uploadAndProcessFira(file, paymentMethod);
      
      if (result.success && result.firaData) {
        // Transform API data to match our component format
        const transformedData = {
          currentProvider: {
            name: "Current Provider",
            paymentAmount: result.firaData.inrAmount,
            charges: [
              {
                type: "FX Rate",
                amount: result.firaData.calculatedExchangeRate,
                isPercentage: false
              },
              {
                type: "Wire Fee",
                amount: result.firaData.platformWireFee
              },
              {
                type: "FIRA Fee",
                amount: result.firaData.platformFiraFee
              }
            ],
            totalOnTransaction: result.firaData.platformWireFee + result.firaData.platformFiraFee + result.firaData.platformTransactionFee,
            effectiveCost: ((result.firaData.inrAmount - result.firaData.finalInrAmount) / result.firaData.inrAmount) * 100
          },
          skydo: {
            name: "Skydo",
            paymentAmount: result.firaData.amount * result.firaData.fxRateSkydo,
            charges: [
              {
                type: "FX Rate",
                amount: result.firaData.fxRateSkydo,
                isPercentage: false
              },
              {
                type: "Wire Fee",
                amount: result.firaData.skydoWireFee
              },
              {
                type: "FIRA Fee",
                amount: result.firaData.skydoFiraFee
              }
            ],
            totalOnTransaction: result.firaData.skydoWireFee + result.firaData.skydoFiraFee + result.firaData.transactionSkydoFee,
            effectiveCost: ((result.firaData.amount * result.firaData.fxRateSkydo - result.firaData.finalInrAmountSkydo) / (result.firaData.amount * result.firaData.fxRateSkydo)) * 100
          },
          savings: {
            amount: result.firaData.finalInrAmountSkydo - result.firaData.finalInrAmount,
            percentage: ((result.firaData.finalInrAmountSkydo - result.firaData.finalInrAmount) / result.firaData.finalInrAmount) * 100
          },
          transactionAmount: result.firaData.inrAmount,
          originalAmount: result.firaData.amount,
          currency: result.firaData.currency
        };
        
        setAnalysisData(transformedData);
        toast({
          title: "Analysis Complete",
          description: "Your FIRA document has been successfully analyzed.",
        });
      } else {
        throw new Error(result.message || "Failed to process FIRA document");
      }
    } catch (error) {
      console.error('Error processing FIRA file:', error);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "Failed to process the FIRA document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToHome = () => {
    setUploadedFile(null);
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  const handleLogoClick = () => {
    handleBackToHome();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Skydo Logo - Left aligned */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start top-6 z-10 mb-8"
        >
          <button 
            onClick={handleLogoClick}
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src="/lovable-uploads/8a593f9d-5b27-4492-ab02-1b13c5699292.png" 
              alt="Skydo Logo" 
              className="h-9 w-auto" 
            />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Find Hidden Costs in Your{" "}
            <AnimatedHeaderText />
            {" "}Document
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Upload your FIRA document to instantly compare your provider's exchange rate against the live market rate offered by Skydo.
          </p>
        </motion.div>

        {!analysisData && !isAnalyzing && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}

        {isAnalyzing && <LoadingStages />}

        {analysisData && (
          <ComparisonResults 
            data={analysisData} 
            onBackToHome={handleBackToHome} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
