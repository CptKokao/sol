interface NetworkErrorMessageProps {
  message: string;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
}

const NetworkErrorMessage = ({
  message,
  dismiss,
}: NetworkErrorMessageProps) => {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button type="button" onClick={dismiss}>
        Закрыть
      </button>
    </div>
  );
};

export default NetworkErrorMessage;
