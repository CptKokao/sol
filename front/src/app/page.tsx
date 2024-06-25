"use client";

import ConnectWallet from "@/components/ConnectWallet";
import TransactionErrorMessage from "@/components/TransactionErrorMessage";
import WaitingForTransactionMessage from "@/components/WaitingForTransactionMessage";
import { MusicShop, MusicShop__factory } from "@/typechain";
import { BrowserProvider, ethers } from "ethers";
import { FormEvent, useEffect, useState } from "react";

// import styles from "./page.module.css";

interface CurrentConnectionProps {
  provider: BrowserProvider | undefined;
  shop: MusicShop | undefined;
  signer: ethers.JsonRpcSigner | undefined;
}

type AlbumProps = {
  index: ethers.BigNumberish;
  uid: string;
  title: string;
  price: ethers.BigNumberish;
  quantity: ethers.BigNumberish;
};

// 1337 d 16-ой системе
const HARDHAT_NETWORK_ID = "0x539";
const MUSIC_SHOP_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

declare let window: any;

export default function Home() {
  const [networkError, setNetworkError] = useState<string>();
  const [transactionError, setTransactionError] = useState<any>();
  const [txBeingSent, setTxBeingSent] = useState<string>();
  const [currentBalance, setCurrentBalance] = useState<string>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [currentConnection, setCurrentConnection] =
    useState<CurrentConnectionProps>();

  // Обновляет баланс
  useEffect(() => {
    (async () => {
      // Подключен кошелек и аккаунт
      if (currentConnection?.provider && currentConnection.signer) {
        console.log(`getBlockNumber`);
        console.log(await currentConnection.provider.getBlockNumber());
        setCurrentBalance(
          (
            await currentConnection.provider.getBalance(
              currentConnection.signer.address,
              await currentConnection.provider.getBlockNumber()
            )
          ).toString()
        );
      }
    })();
  }, [currentConnection, txBeingSent]);

  useEffect(() => {
    (async () => {
      if (currentConnection?.shop && currentConnection.signer) {
        const newAlbums = (await currentConnection.shop.allAlbums()).map(
          (album): AlbumProps => {
            return {
              index: album[0].toString(),
              uid: album[1],
              title: album[2],
              price: album[3],
              quantity: album[4],
            };
          }
        );

        setAlbums((albums) => [...albums, ...newAlbums]);

        // Является ли аккаунт владельцем
        setIsOwner(
          ethers.getAddress(await currentConnection.shop.owner()) ===
            (await currentConnection.signer.getAddress())
        );
      }
    })();
  }, [currentConnection]);

  const _connectWallet = async () => {
    // Проверяем наличие Metamask
    if (window.ethereum === undefined) {
      setNetworkError("Please install Metamask!");

      return;
    }

    if (!(await _checkNetwork())) {
      return;
    }

    // Получить массив аккаунтов
    const [selectedAccount] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await _initialize(ethers.getAddress(selectedAccount));

    // Переключение аккаунтов
    window.ethereum.on(
      "accountsChanged",
      async ([newAccount]: [newAccount: string]) => {
        if (newAccount === undefined) {
          return _resetState();
        }

        await _initialize(ethers.getAddress(newAccount));
      }
    );

    // Переключение на другую сеть
    window.ethereum.on("chainChanged", ([_networkId]: any) => {
      _resetState();
    });
  };

  const _checkNetwork = async (): Promise<boolean> => {
    // Получаем выбранную сеть
    const chosenChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    console.log(chosenChainId);

    // Проверяем выбранную сеть с сеть для тестирования Hardhat(localhost:8545)
    if (chosenChainId === HARDHAT_NETWORK_ID) {
      return true;
    }

    setNetworkError("Please connect to Hardhat network (localhost:8545)!");

    return false;
  };

  // Инициализирует состояние
  const _initialize = async (selectedAccount: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);

    setCurrentConnection({
      ...currentConnection,
      provider,
      signer,
      shop: MusicShop__factory.connect(MUSIC_SHOP_ADDRESS, signer),
    });
  };

  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  };

  const _dismissTransactionError = () => {
    setTransactionError(undefined);
  };

  const _getRpcErrorMessage = (error: any): string => {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  const _resetState = () => {
    setNetworkError(undefined);
    setTransactionError(undefined);
    setTxBeingSent(undefined);
    setCurrentBalance(undefined);
    setIsOwner(false);
    setAlbums([]);
    setCurrentConnection({
      provider: undefined,
      signer: undefined,
      shop: undefined,
    });
  };

  // Добавляет альбом
  const _handleAddAlbum = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentConnection?.shop) {
      return false;
    }

    const shop = currentConnection.shop;
    const formData = new FormData(event.currentTarget);

    const title = formData.get("albumTitle")?.toString();
    const price = formData.get("albumPrice")?.toString();
    const quantity = formData.get("albumQty")?.toString();

    if (title && price && quantity) {
      const uid = ethers.solidityPackedKeccak256(["string"], [title]);

      try {
        const index = await shop.currentIndex();

        const addTx = await shop.addAlbum(
          uid,
          title,
          BigInt(price),
          BigInt(quantity)
        );
        console.log("addTx");
        console.log(addTx);
        setTxBeingSent(addTx.hash);

        await addTx.wait();

        setAlbums((albums) => [
          ...albums,
          {
            index,
            uid,
            title,
            price,
            quantity,
          },
        ]);
      } catch (err) {
        console.error(err);

        setTransactionError(err);
      } finally {
        setTxBeingSent(undefined);
      }
    }
  };

  const _handleBuyAlbum = async (
    album: AlbumProps,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!currentConnection?.shop) {
      return false;
    }

    try {
      const buyTx = await currentConnection.shop.buy(album.index, {
        value: album.price,
      });
      setTxBeingSent(buyTx.hash);
      await buyTx.wait();

      setAlbums(
        albums.map((a) => {
          if (a.index === album.index) {
            album.quantity = BigInt(album.quantity) - BigInt(1);
            return album;
          } else {
            return a;
          }
        })
      );
    } catch (err) {
      console.error(err);

      setTransactionError(err);
    } finally {
      setTxBeingSent(undefined);
    }
  };

  const availableAlbums = () => {
    const albumsList = albums.map((album) => {
      return (
        <li key={album.uid}>
          <>
            {album.title} (#{album.index.toString()})<br />
            Price: {album.price.toString()}
            <br />
            Qty: {album.quantity.toString()}
            <br />
            {BigInt(album.quantity) > BigInt(0) && (
              <button onClick={(e) => _handleBuyAlbum(album, e)}>
                Buy 1 copy
              </button>
            )}
          </>
        </li>
      );
    });

    return albumsList;
  };

  console.log(`currentConnection`);
  console.log(currentConnection);

  return (
    <main>
      {/* Если кошелек НЕ подключен */}
      {!currentConnection?.signer && (
        <ConnectWallet
          connectWallet={_connectWallet}
          networkError={networkError}
          dismiss={_dismissNetworkError}
        />
      )}

      {/* Если кошелек подключен */}
      {currentConnection?.signer && (
        <p>Your address: {currentConnection.signer.address}</p>
      )}

      {/* Если транзакция в процессе */}
      {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}

      {/* Если транзакция завершена с ошибкой */}
      {transactionError && (
        <TransactionErrorMessage
          message={_getRpcErrorMessage(transactionError)}
          dismiss={_dismissTransactionError}
        />
      )}

      {currentBalance && (
        <p>Your balance: {ethers.formatEther(currentBalance)} ETH</p>
      )}

      {albums.length > 0 && <ul>{availableAlbums()}</ul>}

      {isOwner && !txBeingSent && (
        <form onSubmit={_handleAddAlbum}>
          <h2>Add album</h2>

          <label>
            Title:
            <input type="text" name="albumTitle" />
          </label>

          <label>
            Price:
            <input type="text" name="albumPrice" />
          </label>

          <label>
            Qty:
            <input type="text" name="albumQty" />
          </label>

          <input type="submit" value="Add!" />
        </form>
      )}
    </main>
  );
}
