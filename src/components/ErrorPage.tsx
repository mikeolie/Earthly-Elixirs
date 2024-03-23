import { useRouteError, ErrorResponse } from "react-router-dom";

function ErrorPage(): JSX.Element {
  const error: ErrorResponse = useRouteError() as unknown as ErrorResponse;
  return (
    <div>
      <h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.status}</i>
			</p>
    </div>
  );
}

export default ErrorPage;
