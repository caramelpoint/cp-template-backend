import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ContractInstance from '../contracts/Example.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const NETWORKS = {
  '4': 'https://rinkeby.infura.io/v3/',
  '1': 'https://mainnet.infura.io/v3/',
  '80001': 'https://polygon-mumbai.infura.io/v3/',
  '137': 'https://polygon-mainnet.infura.io/v3/',
};

@Injectable()
export class Web3Service {
  private readonly web3;
  private readonly walletAccount;
  private readonly publicKey;
  private readonly deployedNetwork;
  private readonly nftFactoryInstance;

  constructor(private configService: ConfigService) {
    const web3Configs = this.configService.get('web3');
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(NETWORKS[web3Configs.networkId] + web3Configs.infuraProjectId),
    );

    this.walletAccount = this.web3.eth.accounts.privateKeyToAccount(web3Configs.walletPrivateKey);
    this.publicKey = web3Configs.walletPublicKey;

    this.deployedNetwork = ContractInstance.networks[web3Configs.networkId];
    this.nftFactoryInstance = new this.web3.eth.Contract(
      ContractInstance.abi,
      this.deployedNetwork && this.deployedNetwork.address,
    );
  }

  async getTokenInformation(tokenUrl: string): Promise<any> {
    const tokenInfo = await this.nftFactoryInstance.methods.approvedUris(tokenUrl).call();

    return tokenInfo;
  }

  decodeEvent(data) {
    const hexString = data.logs[2].data;
    const topics = data.logs[2].topics;
    const inputs = [
      {
        type: 'uint256',
        name: 'tokenId',
        indexed: false,
      },
    ];

    return this.web3.eth.abi.decodeLog(inputs, hexString, topics);
  }

  weiToEther(wei: string): string {
    return this.web3.utils.fromWei(wei, 'ether');
  }
}
