import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: "Error" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <strong>{this.state.errorMessage}</strong>;
    }

    return this.props.children;
  }
}
