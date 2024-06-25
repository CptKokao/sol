interface WaitingForTransactionMessageProps {
  txHash: string;
}

const WaitingForTransactionMessage = ({
  txHash,
}: WaitingForTransactionMessageProps) => {
  return (
    <div>
      Waiting fot transaction <strong>{txHash}</strong>
    </div>
  );
};

export default WaitingForTransactionMessage;
