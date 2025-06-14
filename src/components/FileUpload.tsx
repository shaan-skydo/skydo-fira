
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
    if (uploadedFile) {
      onFileUpload(uploadedFile);
    }
  };

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
          className="mt-8 text-center"
        >
          <Button 
            onClick={handleAnalyze}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Analyze Document
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
