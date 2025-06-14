
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Calculator, TrendingDown, CheckCircle } from "lucide-react";

const loadingStages = [
  {
    id: 1,
    icon: Upload,
    title: "Uploading Document",
    description: "Securely processing your FIRA file...",
    duration: 2000
  },
  {
    id: 2,
    icon: FileText,
    title: "Analyzing Data",
    description: "Extracting transaction details and fees...",
    duration: 2500
  },
  {
    id: 3,
    icon: Calculator,
    title: "Calculating Savings",
    description: "Comparing with live market rates...",
    duration: 2000
  },
  {
    id: 4,
    icon: TrendingDown,
    title: "Finding Best Pricing",
    description: "Identifying optimal exchange opportunities...",
    duration: 1500
  }
];

export const LoadingStages = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    const progressThroughStages = async () => {
      for (let i = 0; i < loadingStages.length; i++) {
        setCurrentStage(i);
        
        await new Promise((resolve) => {
          setTimeout(() => {
            setCompletedStages(prev => [...prev, i]);
            resolve(void 0);
          }, loadingStages[i].duration);
        });
      }
    };

    progressThroughStages();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-12"
    >
      <div className="space-y-6">
        {loadingStages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = currentStage === index;
          const isCompleted = completedStages.includes(index);
          const isPending = currentStage < index;
          
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' 
                  : isCompleted
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-white border-2 border-gray-100'
              }`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
              }`}>
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold transition-colors duration-300 ${
                  isActive 
                    ? 'text-blue-800' 
                    : isCompleted
                      ? 'text-green-800'
                      : 'text-gray-600'
                }`}>
                  {stage.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${
                  isActive 
                    ? 'text-blue-600' 
                    : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-500'
                }`}>
                  {stage.description}
                </p>
              </div>
              
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <div className="inline-flex items-center space-x-2 text-slate-600">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="text-lg font-medium">Processing your analysis...</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
