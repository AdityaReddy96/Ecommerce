import { Loader } from "lucide-react";

export const SpinnerLoader = ({ size = 24, className = "" }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader
        className={`animate-spin text-muted-foreground ${className}`}
        size={size}
      />
    </div>
  );
};
