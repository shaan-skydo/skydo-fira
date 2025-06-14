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
      // Mock analysis data with realistic demo values
      const mockData = {
        currentProvider: {
          name: "Current Bank",
          paymentAmount: 415000, // $5000 * 83 INR (base calculation)
          charges: [{
            type: "FX Rate",
            amount: 85.19,
            isPercentage: false
          }, {
            type: "Wire Fee",
            amount: 30.00
          }, {
            type: "FIRA Fee",
            amount: 5.00
          }],
          totalOnTransaction: 8596, // Calculated to get ₹4,21,904 received
          effectiveCost: 1.85
        },
        skydo: {
          name: "Skydo",
          paymentAmount: 415000, // $5000 * 83 INR (base calculation)
          charges: [{
            type: "FX Rate",
            amount: 86.09,
            isPercentage: false
          }, {
            type: "Wire Fee",
            amount: 0.00
          }, {
            type: "FIRA Fee",
            amount: 0.00
          }],
          totalOnTransaction: 2978, // Calculated to get ₹4,27,522 received
          effectiveCost: 0.58
        },
        savings: {
          amount: 5618, // Difference between what you'll receive
          percentage: 65.4
        },
        transactionAmount: 415000 // Base INR amount
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
        {/* Skydo Logo - Left aligned */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="flex justify-start top-6 z-10 mb-8">
          <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity duration-200">
            <img src="/lovable-uploads/8a593f9d-5b27-4492-ab02-1b13c5699292.png" alt="Skydo Logo" className="h-9 w-auto" />
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
      }} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
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
