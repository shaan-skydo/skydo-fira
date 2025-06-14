import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ComparisonResults } from "@/components/ComparisonResults";
import { AnimatedHeaderText } from "@/components/AnimatedHeaderText";
import { LoadingStages } from "@/components/LoadingStages";
import { motion } from "framer-motion";
const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);

    // Simulate file processing with realistic timing
    setTimeout(() => {
      // Mock analysis data - in real implementation, this would parse the FIRA file
      const mockData = {
        currentProvider: {
          name: "Current Bank",
          charges: [{
            type: "Wire Fee",
            amount: 25.00
          }, {
            type: "FX Margin",
            amount: 2.5,
            isPercentage: true
          }, {
            type: "FIRA Fee",
            amount: 15.00
          }, {
            type: "Lifting Charges",
            amount: 500.00
          }],
          totalOnTransaction: 1275.00,
          effectiveCost: 2.85
        },
        skydo: {
          name: "Skydo",
          charges: [{
            type: "Wire Fee",
            amount: 3.00
          }, {
            type: "FX Margin",
            amount: 0.5,
            isPercentage: true
          }, {
            type: "FIRA Fee",
            amount: 0.00
          }, {
            type: "Lifting Charges",
            amount: 0.00
          }],
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
    }, 8000); // Extended timing for loading stages
  };
  const handleBackToHome = () => {
    setUploadedFile(null);
    setAnalysisData(null);
    setIsAnalyzing(false);
  };
  const handleLogoClick = () => {
    handleBackToHome();
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Skydo Logo */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="absolute top-6 left-6 z-10">
          <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity duration-200">
            <img src="/lovable-uploads/8a593f9d-5b27-4492-ab02-1b13c5699292.png" alt="Skydo Logo" className="h-8 w-auto " />
          </button>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12 mt-20">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Find Hidden Costs in Your{" "}
            <AnimatedHeaderText />
            {" "}Document
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Upload your FIRA document to instantly compare your provider's exchange rate against the live market rate offered by Skydo.
          </p>
        </motion.div>

        {!analysisData && !isAnalyzing && <FileUpload onFileUpload={handleFileUpload} />}

        {isAnalyzing && <LoadingStages />}

        {analysisData && <ComparisonResults data={analysisData} onBackToHome={handleBackToHome} />}
      </div>
    </div>;
};
export default Index;