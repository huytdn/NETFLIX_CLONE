import * as React from "react";

export const Card = ({ className = "", ...props }) => (
  <div
    className={`rounded-xl border border-gray-800 bg-transparent text-white shadow-md ${className}`}
    {...props}
  />
);

export const CardContent = ({ className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props} />
);
