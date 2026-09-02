import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-error">
      <AlertCircle className="h-10 w-10 mb-4" />
      <p className="text-lg font-medium text-text-main mb-2">
        Oops! Something went wrong.
      </p>
      <p className="text-sm text-text-muted mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
