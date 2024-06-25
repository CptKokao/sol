interface TransactionErrorMessageProps {
  message: string;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
}

const TransactionErrorMessage = ({
  message,
  dismiss,
}: TransactionErrorMessageProps) => {
  return (
    <div>
      TX error: {message}
      <button type="button" onClick={dismiss}>
        Закрыть
      </button>
    </div>
  );
};

export default TransactionErrorMessage;
