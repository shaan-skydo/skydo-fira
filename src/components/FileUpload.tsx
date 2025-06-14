
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File, paymentMethod: string) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  const handleAnalyze = () => {
    if (uploadedFile && acceptedTerms && paymentMethod) {
      onFileUpload(uploadedFile, paymentMethod);
    }
  };

  const canAnalyze = uploadedFile && acceptedTerms && paymentMethod;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 bg-white shadow-lg hover:shadow-xl
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : uploadedFile 
              ? 'border-green-500 bg-green-50' 
              : 'border-slate-300 hover:border-blue-400'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          {uploadedFile ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ y: isDragActive ? -10 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Upload className="w-16 h-16 text-blue-400 mx-auto" />
            </motion.div>
          )}

          {uploadedFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <FileText className="w-6 h-6 text-green-600" />
                <span className="text-lg font-medium text-green-700">
                  {uploadedFile.name}
                </span>
              </div>
              <p className="text-sm text-green-600">
                File uploaded successfully! Ready to analyze.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-700">
                {isDragActive ? "Drop your file here" : "Drag and drop your FIRA/FIRC file here"}
              </h3>
              <p className="text-slate-500">
                or click to select (PDF, XLS, XLSX)
              </p>
            </div>
          )}
        </div>
      </div>

      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 space-y-6"
        >
          {/* Payment Method Dropdown */}
          <div className="space-y-2">
            <label htmlFor="payment-method" className="block text-sm font-medium text-slate-700">
              Payment Method
            </label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                <SelectItem value="BANK">Bank</SelectItem>
                <SelectItem value="PAYPAL">Paypal</SelectItem>
                <SelectItem value="PAYONEER">Payoneer</SelectItem>
                <SelectItem value="WISE">Wise</SelectItem>
                <SelectItem value="OTHERS">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
              I agree to the{" "}
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 underline"
                onClick={(e) => e.preventDefault()}
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 underline"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>. 
              I understand that my file will be processed securely and used only for analysis purposes.
            </label>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              size="lg"
              className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                canAnalyze
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Analyze Document
            </Button>
            {uploadedFile && (!acceptedTerms || !paymentMethod) && (
              <p className="text-sm text-slate-500 mt-2">
                {!paymentMethod && !acceptedTerms 
                  ? "Please select a payment method and accept the terms & conditions to continue"
                  : !paymentMethod 
                    ? "Please select a payment method to continue"
                    : "Please accept the terms & conditions to continue"
                }
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
