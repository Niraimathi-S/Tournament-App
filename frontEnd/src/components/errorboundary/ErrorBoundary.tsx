import React, { Component } from "react";

export class ErrorBoundary extends Component<any, { errorMessage: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="app">
          Oops!! An error occured
          <br />
          {this.state.errorMessage}
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
