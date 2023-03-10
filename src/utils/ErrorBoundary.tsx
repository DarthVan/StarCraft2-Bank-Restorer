import { Component } from "react";

class ErrorBoundary extends Component {

	public override state: { error: any } = {
		error: null,
	};

	constructor(props: any) {
		super(props);
		//this.state = { hasError: false };
	}

	public static getDerivedStateFromError(error: any): { error: any } {
		return { error };
	}

	public override render(): any {
		const { error } = this.state;

		if (error) {
			return (
				<div>
					<p>Seems like an error occured!</p>
					<p>{error.message}</p>
				</div>
			);
		}

		return (this.props as any)?.children; // test it
	}
}

export default ErrorBoundary;