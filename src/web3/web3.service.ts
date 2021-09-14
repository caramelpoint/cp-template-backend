import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ContractABI from '../contracts/Example.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const NETWORKS = {
  '4': 'https://rinkeby.infura.io/v3/',
  '1': 'https://mainnet.infura.io/v3/',
  '80001': 'https://polygon-mumbai.infura.io/v3/',
  '137': 'https://polygon-mainnet.infura.io/v3/',
};

interface WalletAccount {
  address: string;
  privateKey: string;
  signTransaction: (tx, callback) => void;
  sign: (data) => void;
}

interface DeployedNetwork {
  address: string;
  transactionHash: string;
}
@Injectable()
export class Web3Service {
  private readonly web3;
  private readonly walletAccount: WalletAccount;
  private readonly publicKey: string;
  private readonly deployedNetwork: DeployedNetwork;
  private readonly deployedContractInstance;

  constructor(private configService: ConfigService) {
    const web3Configs = this.configService.get('web3');
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(NETWORKS[web3Configs.networkId] + web3Configs.infuraProjectId),
    );

    this.walletAccount = this.web3.eth.accounts.privateKeyToAccount(web3Configs.walletPrivateKey);
    this.publicKey = web3Configs.walletPublicKey;

    this.deployedNetwork = ContractABI.networks[web3Configs.networkId];
    this.deployedContractInstance = new this.web3.eth.Contract(
      ContractABI.abi,
      this.deployedNetwork && this.deployedNetwork.address,
    );
  }

  weiToEther(wei: string): string {
    return this.web3.utils.fromWei(wei, 'ether');
  }
}
