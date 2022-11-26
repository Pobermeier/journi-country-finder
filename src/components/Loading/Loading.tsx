import React from "react";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={`loading ${className}`}>
      <rect y="42.86" width="13.72" height="13.72" />
      <rect y="42.86" width="13.72" height="13.72" x="27.43" />
      <rect y="42.86" width="13.72" height="13.72" x="54.85" />
      <rect y="42.86" width="13.72" height="13.72" x="82.28" />
    </svg>
  );
};

export default Loading;
