/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface AlbumTrackerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "albums"
      | "createAlbum"
      | "currentIndex"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
      | "triggerDelivery"
      | "triggerPayment"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "AlbumStateChanged" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "albums",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAlbum",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "currentIndex",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "triggerDelivery",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "triggerPayment",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "albums", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createAlbum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "triggerDelivery",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "triggerPayment",
    data: BytesLike
  ): Result;
}

export namespace AlbumStateChangedEvent {
  export type InputTuple = [
    _albumAddress: AddressLike,
    _albumIndex: BigNumberish,
    _stateNum: BigNumberish
  ];
  export type OutputTuple = [
    _albumAddress: string,
    _albumIndex: bigint,
    _stateNum: bigint
  ];
  export interface OutputObject {
    _albumAddress: string;
    _albumIndex: bigint;
    _stateNum: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AlbumTracker extends BaseContract {
  connect(runner?: ContractRunner | null): AlbumTracker;
  waitForDeployment(): Promise<this>;

  interface: AlbumTrackerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  albums: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, string] & {
        album: string;
        state: bigint;
        price: bigint;
        title: string;
      }
    ],
    "view"
  >;

  createAlbum: TypedContractMethod<
    [_price: BigNumberish, _title: string],
    [void],
    "nonpayable"
  >;

  currentIndex: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  triggerDelivery: TypedContractMethod<
    [_index: BigNumberish],
    [void],
    "nonpayable"
  >;

  triggerPayment: TypedContractMethod<
    [_index: BigNumberish],
    [void],
    "payable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "albums"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, string] & {
        album: string;
        state: bigint;
        price: bigint;
        title: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "createAlbum"
  ): TypedContractMethod<
    [_price: BigNumberish, _title: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "currentIndex"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "triggerDelivery"
  ): TypedContractMethod<[_index: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "triggerPayment"
  ): TypedContractMethod<[_index: BigNumberish], [void], "payable">;

  getEvent(
    key: "AlbumStateChanged"
  ): TypedContractEvent<
    AlbumStateChangedEvent.InputTuple,
    AlbumStateChangedEvent.OutputTuple,
    AlbumStateChangedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "AlbumStateChanged(address,uint256,uint256)": TypedContractEvent<
      AlbumStateChangedEvent.InputTuple,
      AlbumStateChangedEvent.OutputTuple,
      AlbumStateChangedEvent.OutputObject
    >;
    AlbumStateChanged: TypedContractEvent<
      AlbumStateChangedEvent.InputTuple,
      AlbumStateChangedEvent.OutputTuple,
      AlbumStateChangedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
