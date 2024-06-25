import NetworkErrorMessage from "./NetworkErrorMessage";

interface ConnectWalletProps {
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
  networkError: string | undefined;
}

const ConnectWallet = ({
  connectWallet,
  dismiss,
  networkError,
}: ConnectWalletProps) => {
  return (
    <>
      <div className="">
        {networkError && (
          <NetworkErrorMessage message={networkError} dismiss={dismiss} />
        )}
      </div>

      <p>Please connect your account...</p>

      <button type="button" onClick={connectWallet}>
        Connect Wallet
      </button>
    </>
  );
};

export default ConnectWallet;
