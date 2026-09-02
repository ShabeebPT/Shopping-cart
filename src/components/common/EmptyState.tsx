import React from "react";
import { PackageX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-background p-4 rounded-full mb-4">
        <PackageX className="h-12 w-12 text-text-muted" />
      </div>
      <h3 className="text-xl font-semibold text-text-main mb-2">{title}</h3>
      <p className="text-text-muted max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
