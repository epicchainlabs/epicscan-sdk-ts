import { EpicChainREST } from '@epicchain/epicscan-sdk-ts';

async function getBalance() {
  try {
    const balance = await EpicChainREST.balance(
      'Xf3FTsSGwTXx4G4Tm8x24TyRunzgYa5zFs',
      'testnet'
    );
    console.log(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

getBalance();
