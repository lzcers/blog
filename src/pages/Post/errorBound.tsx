import React, { ErrorInfo } from "react";

export default class ErrorBoundary extends React.Component<any, { hasError: boolean; error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: string) {
    return { hasError: true, error };
  }


  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h3 style={{ textAlign: "center" }}>发生了某些意外，这篇文章不见了！</h3>
          <br />
          <p className="err-info">{this.state.error.toString()}</p>
          <p className="err-info">{JSON.stringify(this.props.post)}</p>
        </>
      )
    }
    return this.props.children;
  }
}