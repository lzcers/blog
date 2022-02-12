import React, { ErrorInfo } from "react";

export default class ErrorBoundary extends React.Component<{}, { hasError: boolean; error: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: '' };
    this.setState
  }

  static getDerivedStateFromError(error: string) {
    return { hasError: true, error };
  }


  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h3 style={{ textAlign: "center" }}>发生了某些意外，这篇文章不见了！</h3>
          <br />
          <span style={{ color: '#fff' }}>{this.state.error.toString()}</span>
        </>
      )
    }
    return this.props.children;
  }
}