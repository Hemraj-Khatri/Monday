import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert variant={variant} className="mt-3">
      {children}
    </Alert>
  );
}

export default Message;
