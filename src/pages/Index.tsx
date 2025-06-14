
import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ComparisonResults } from "@/components/ComparisonResults";
import { motion } from "framer-motion";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    
    // Simulate file processing
    setTimeout(() => {
      // Mock analysis data - in real implementation, this would parse the FIRA file
      const mockData = {
        currentProvider: {
          name: "Current Bank",
          charges: [
            { type: "Wire Transfer Fee", amount: 25.00 },
            { type: "Foreign Exchange Margin", amount: 2.5, isPercentage: true },
            { type: "Correspondent Bank Fee", amount: 15.00 },
            { type: "Lifting Charges", amount: 500.00 }
          ],
          totalOnTransaction: 1275.00,
          effectiveCost: 2.85
        },
        skydo: {
          name: "Skydo",
          charges: [
            { type: "Wire Transfer Fee", amount: 3.00 },
            { type: "Foreign Exchange Margin", amount: 0.5, isPercentage: true },
            { type: "Correspondent Bank Fee", amount: 0.00 },
            { type: "Lifting Charges", amount: 0.00 }
          ],
          totalOnTransaction: 253.00,
          effectiveCost: 0.51
        },
        savings: {
          amount: 1022.00,
          percentage: 80.1
        },
        transactionAmount: 50000
      };
      
      setAnalysisData(mockData);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleBackToHome = () => {
    setUploadedFile(null);
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Find Hidden Costs in Your{" "}
            <span className="text-blue-600">FIRA</span> Document
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Upload your FIRA/FIRC file to instantly compare your current provider's exchange
            rate against the live market rate offered by Skydo.
          </p>
        </motion.div>

        {!analysisData && !isAnalyzing && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}

        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-6"></div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">Analyzing your FIRA document...</h3>
            <p className="text-slate-500">This may take a few moments</p>
          </motion.div>
        )}

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
