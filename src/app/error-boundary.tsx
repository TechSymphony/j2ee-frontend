import { HttpError } from "@/lib/http";
import React, { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: HttpError;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: HttpError) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: HttpError, errorInfo: React.ErrorInfo) {
    // Log the custom error details
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return fallback ? (
        fallback
      ) : (
        <div>
          <h1>Something went wrong.</h1>
          <p>{error?.message}</p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
