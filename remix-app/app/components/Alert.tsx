import { useEffect, useState } from "react";

type AlertProps = { message: string; onTimeout: () => void };

const Alert = ({ message, onTimeout }: AlertProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onTimeout();
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onTimeout]);

  if (!show) {
    return null;
  }

  return (
    <div className="alert alert-success shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
