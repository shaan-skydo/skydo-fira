
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, ChevronDown, ChevronUp, Info, ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface ComparisonResultsProps {
  data: {
    currentProvider: {
      name: string;
      paymentAmount: number;
      charges: Array<{
        type: string;
        amount: number;
        isPercentage?: boolean;
      }>;
      totalOnTransaction: number;
      effectiveCost: number;
    };
    skydo: {
      name: string;
      paymentAmount: number;
      charges: Array<{
        type: string;
        amount: number;
        isPercentage?: boolean;
      }>;
      totalOnTransaction: number;
      effectiveCost: number;
    };
    savings: {
      amount: number;
      percentage: number;
    };
    transactionAmount: number;
  };
  onBackToHome: () => void;
}

export const ComparisonResults = ({
  data,
  onBackToHome
}: ComparisonResultsProps) => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto space-y-8 relative pt-6"
    >
      {/* Enhanced Glassmorphic Back Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onClick={onBackToHome}
        className="fixed top-32 left-8 z-50 w-14 h-14 rounded-full backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl hover:bg-white/40 hover:scale-105 hover:shadow-3xl transition-all duration-300 flex items-center justify-center group before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
      >
        <ArrowLeft className="w-6 h-6 text-skydo-gray group-hover:text-skydo-gray-light transition-all duration-300 relative z-10 drop-shadow-sm" />
      </motion.button>

      {/* Savings Header */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-skydo-green/10 to-skydo-green/5 border-skydo-green/20 skydo-card-shadow">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingDown className="w-8 h-8 text-skydo-green" />
              <h2 className="text-3xl font-bold text-skydo-green">
                You could save {formatCurrency(data.savings.amount)} with Skydo
              </h2>
            </div>
            <p className="text-skydo-green text-lg font-medium">
              That's {formatPercentage(data.savings.percentage)} less than your current provider
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Provider */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full skydo-card-shadow border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-skydo-gray text-center">Current Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Amount */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-skydo-gray-light">Payment Amount</span>
                <span className="font-semibold text-skydo-gray">
                  {formatCurrency(data.currentProvider.paymentAmount)}
                </span>
              </div>

              {data.currentProvider.charges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-skydo-gray-light">{charge.type}</span>
                  <span className="font-semibold text-skydo-gray">
                    {charge.isPercentage ? formatPercentage(charge.amount) : formatCurrency(charge.amount)}
                  </span>
                </div>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-skydo-gray">You'll receive</span>
                  <span className="font-bold text-lg text-skydo-gray">
                    {formatCurrency(data.transactionAmount - data.currentProvider.totalOnTransaction)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-skydo-gray-light">Effective cost</span>
                  <span className="text-skydo-gray-light">
                    {formatPercentage(data.currentProvider.effectiveCost)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skydo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full skydo-card-shadow border-skydo-blue/20 bg-gradient-to-br from-white to-skydo-blue/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-skydo-blue text-center flex items-center justify-center space-x-2">
                <img 
                  src="/lovable-uploads/07586f70-3dc6-4a36-9683-1478e37a92d3.png" 
                  alt="Skydo Logo" 
                  className="w-6 h-6"
                />
                <span>Skydo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Amount */}
              <div className="flex justify-between items-center py-2 border-b border-skydo-blue/10">
                <span className="text-skydo-gray-light">Payment Amount</span>
                <span className="font-semibold text-skydo-blue">
                  {formatCurrency(data.skydo.paymentAmount)}
                </span>
              </div>

              {data.skydo.charges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-skydo-blue/10">
                  <span className="text-skydo-gray-light">{charge.type}</span>
                  <span className="font-semibold text-skydo-blue">
                    {charge.amount === 0 ? (
                      <span className="text-skydo-green font-bold">FREE</span>
                    ) : charge.isPercentage ? formatPercentage(charge.amount) : formatCurrency(charge.amount)}
                  </span>
                </div>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-skydo-blue/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-skydo-gray">You'll receive</span>
                  <span className="font-bold text-lg text-skydo-blue">
                    {formatCurrency(data.transactionAmount - data.skydo.totalOnTransaction)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-skydo-gray-light">Effective cost</span>
                  <span className="text-skydo-blue">
                    {formatPercentage(data.skydo.effectiveCost)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Skydo Features Collapsible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Collapsible open={isFeaturesOpen} onOpenChange={setIsFeaturesOpen}>
          <Card className="border-skydo-blue/20 bg-gradient-to-r from-skydo-blue/5 to-white skydo-card-shadow">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-skydo-blue/5 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-skydo-blue flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/07586f70-3dc6-4a36-9683-1478e37a92d3.png" 
                      alt="Skydo Logo" 
                      className="w-6 h-6"
                    />
                    <span>Why Choose Skydo?</span>
                  </CardTitle>
                  {isFeaturesOpen ? (
                    <ChevronUp className="w-5 h-5 text-skydo-blue" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-skydo-blue" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-skydo-blue/10 skydo-card-shadow">
                    <span className="text-skydo-blue font-medium">Transparent pricing</span>
                    <a 
                      href="https://www.skydo.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-5 h-5 bg-skydo-blue/10 rounded-full hover:bg-skydo-blue/20 transition-colors"
                    >
                      <Info className="w-3 h-3 text-skydo-blue" />
                    </a>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg border border-skydo-blue/10 skydo-card-shadow">
                    <span className="text-skydo-blue font-medium">Zero forex markup</span>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg border border-skydo-blue/10 skydo-card-shadow">
                    <span className="text-skydo-blue font-medium">Free and instant FIRA/FIRC</span>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg border border-skydo-blue/10 skydo-card-shadow">
                    <span className="text-skydo-blue font-medium">Personalised dashboard with invoicing and analytics</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-skydo-blue/10 skydo-card-shadow">
                    <span className="text-skydo-blue font-medium">Support for payment via Links</span>
                    <span className="px-2 py-1 bg-skydo-green/10 text-skydo-green text-xs font-semibold rounded-full border border-skydo-green/20">
                      NEW
                    </span>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </motion.div>

      {/* Explore Skydo Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Button
          onClick={() => window.open('https://www.skydo.com/', '_blank')}
          className="bg-skydo-blue hover:bg-skydo-blue-dark text-white border-0 px-8 py-3 text-lg font-semibold rounded-xl skydo-card-shadow hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Explore Skydo
        </Button>
      </motion.div>
    </motion.div>
  );
};
