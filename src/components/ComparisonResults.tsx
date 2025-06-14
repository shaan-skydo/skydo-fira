
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown } from "lucide-react";

interface ComparisonResultsProps {
  data: {
    currentProvider: {
      name: string;
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
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Savings Header */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-green-800">
                You could save {formatCurrency(data.savings.amount)} with Skydo
              </h2>
            </div>
            <p className="text-green-700 text-lg">
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
          <Card className="h-full shadow-lg border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-slate-700 text-center">Current Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.currentProvider.charges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{charge.type}</span>
                  <span className="font-semibold text-slate-800">
                    {charge.isPercentage ? formatPercentage(charge.amount) : formatCurrency(charge.amount)}
                  </span>
                </div>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">You'll receive</span>
                  <span className="font-bold text-lg text-slate-800">
                    {formatCurrency(data.transactionAmount - data.currentProvider.totalOnTransaction)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Effective cost</span>
                  <span className="text-slate-600">
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
          <Card className="h-full shadow-lg border-green-200 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-green-700 text-center flex items-center justify-center space-x-2">
                <img 
                  src="/lovable-uploads/e114eb01-a598-4afe-a954-12034557a0ea.png" 
                  alt="Skydo Logo" 
                  className="w-6 h-6"
                />
                <span>Skydo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.skydo.charges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-slate-600">{charge.type}</span>
                  <span className="font-semibold text-green-700">
                    {charge.amount === 0 ? "FREE" : charge.isPercentage ? formatPercentage(charge.amount) : formatCurrency(charge.amount)}
                  </span>
                </div>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">You'll receive</span>
                  <span className="font-bold text-lg text-green-800">
                    {formatCurrency(data.transactionAmount - data.skydo.totalOnTransaction)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Effective cost</span>
                  <span className="text-green-600">
                    {formatPercentage(data.skydo.effectiveCost)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Button
          onClick={onBackToHome}
          variant="outline"
          size="lg"
          className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};
