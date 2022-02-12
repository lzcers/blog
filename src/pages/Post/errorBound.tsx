import React, { ErrorInfo } from "react";

export default class ErrorBoundary extends React.Component<{ post: any }, { hasError: boolean; error: string }> {
  constructor(props: any) {
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
          <p style={{ color: '#fff' }}>{this.state.error.toString()}</p>
          <p style={{ color: '#fff', maxHeight: 300 }}>{JSON.stringify(this.props.post)}</p>
        </>
      )
    }
    return this.props.children;
  }
}