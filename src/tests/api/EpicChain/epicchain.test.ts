import { assert } from 'chai'
import { EpicChainREST } from '../../../api/EpicChain'
import type { ContractStatsResponse } from 'src/interfaces/api/epicchain'

describe('epicchain sdk', () => {
  it('should get an asset', async () => {
    const res = await EpicChainREST.asset(
      '0xbc8459660544656355b4f60861c22f544341e828',
      'testnet'
    )
    assert.isNotNull(res)
    assert.strictEqual(res.name, 'EpicPulse')
    assert.strictEqual(
      res.scripthash,
      '0xbc8459660544656355b4f60861c22f544341e828'
    )
  })

  it('should get assets', async () => {
    const res = await EpicChainREST.assets(2, 'testnet')
    assert.isNotNull(res)
    assert.strictEqual(res.items.length, 15)
  })

  it('should get a balance', async () => {
    const res = await EpicChainREST.balance(
      'Xf3FTsSGwTXx4G4Tm8x24TyRunzgYa5zFs',
      'testnet'
    )

    assert.isNotNull(res)
    assert.isAtLeast(res.length, 2) // 2 because of EpicChain and EpicPulse.
  })

  it('should get a block', async () => {
    const res = await EpicChainREST.block(0, 'testnet')
    assert.isNotNull(res)
    assert.isObject(res)
    assert.strictEqual(
      res.hash,
      '0x9d3276785e7306daf59a3f3b9e31912c095598bbfb8a4476b821b0e59be4c57a'
    )
    assert.isNotNull(res.witnesses)
    assert.strictEqual(res.size, 114)
  })

  it('should get a block with transactions', async () => {
    const res = await EpicChainREST.block(2486, 'testnet')
    assert.isNotNull(res)
    assert.isObject(res)
    assert.strictEqual(
      res.hash,
      '0xe0f8d56fb07b79be5d572ccf0ad7b643e7cbc24d48dede875fd7e041e5debb7f'
    )
    assert.strictEqual(res.tx.length, 1)
  })

  it('should get blocks', async () => {
    const res = await EpicChainREST.blocks(1, 'testnet')
    assert.isNotNull(res)
    assert.isArray(res.items)
    assert.strictEqual(res.items.length, 15)
  })

  it('should get a contract', async () => {
    const res = await EpicChainREST.contract(
      '0x4625b78c56b7e43e1e6fb4ed0200e9a0a9152c92',
      'testnet'
    )
    assert.isNotNull(res)
    assert.isObject(res)
    assert.strictEqual(res.id, 2)
    assert.strictEqual(res.hash, '0x4625b78c56b7e43e1e6fb4ed0200e9a0a9152c92')
    assert.isObject(res.nef)
  })

  it('should get contracts', async () => {
    const res = await EpicChainREST.contracts(1, 'testnet')
    assert.isNotNull(res)
    assert.isObject(res)
  })

  it('should get contract stats', async () => {
    const res = (await EpicChainREST.contractStats(
      '0x4625b78c56b7e43e1e6fb4ed0200e9a0a9152c92',
      'testnet'
    )) as ContractStatsResponse
    assert.isNotNull(res)
    // validated that this was still a typeof Object TS is weird about bracket notation so had to typescript above
    assert.isObject(res)
  })

  it('should get nodes', async () => {
    const res = await EpicChainREST.getAllNodes('testnet')
    assert.isNotNull(res)
  })

  it('should get the block height', async () => {
    const res = await EpicChainREST.height('testnet')
    assert.isNotNull(res)
    assert.isObject(res)
  })

  it('should get the transaction log', async () => {
    const res = await EpicChainREST.log(
      '0x7f40e2252fe791b89d60c2cdd9419de7984e5fab6d941d3cf3a8d0c96135c535',
      'testnet'
    )
    assert.isNotNull(res)
    assert.strictEqual(
      res.txid,
      '0x7f40e2252fe791b89d60c2cdd9419de7984e5fab6d941d3cf3a8d0c96135c535'
    )
    assert.strictEqual(res.trigger, 'Application')
    assert.strictEqual(res.notifications.length, 1)
  })

  it('should get a transaction', async () => {
    const res = await EpicChainREST.transaction(
      '0x7f40e2252fe791b89d60c2cdd9419de7984e5fab6d941d3cf3a8d0c96135c535',
      'testnet'
    )
    assert.isNotNull(res)
    assert.strictEqual(
      res.hash,
      '0x7f40e2252fe791b89d60c2cdd9419de7984e5fab6d941d3cf3a8d0c96135c535'
    )
    assert.strictEqual(res.sender, 'XwaSrhnY8XLXk6LJ1r2B9ZbUqA1MBsbs4S')
    assert.strictEqual(res.size, 860)
    assert.strictEqual(res.signers?.length, 2)
  })

  it('should get transactions', async () => {
    const res = await EpicChainREST.transactions(1, 'testnet')
    assert.isNotNull(res)
    assert.isObject(res)
    assert.isArray(res.items)
    assert.strictEqual(res.items.length, 15)
  })

  it('should get transfer history', async () => {
    const res = await EpicChainREST.transferHistory(
      'Xf3FTsSGwTXx4G4Tm8x24TyRunzgYa5zFs',
      1,
      'testnet'
    )
    assert.isNotNull(res)
    assert.isObject(res)
    assert.isArray(res.items)
    assert.isAtLeast(res.items.length, 2)
  })

  it('should get the voter information of a user', async () => {
    const res = await EpicChainREST.voter('Xf3FTsSGwTXx4G4Tm8x24TyRunzgYa5zFs')
    assert.isNotNull(res)
    assert.isObject(res)
  })

  it('should get EpicChain committee information', async () => {
    const res = await EpicChainREST.committee()
    assert.isNotNull(res)
    assert.isArray(res)
  })

  it('should get the full transactions history for an address', async () => {
    const res = await EpicChainREST.addressTransactions(
      'Xf3FTsSGwTXx4G4Tm8x24TyRunzgYa5zFs',
      1,
      'testnet'
    )
    assert.isNotNull(res)
    assert.isObject(res)
    assert.isArray(res.items)
    assert.isAtLeast(res.items.length, 2)
  })

  it('should get the token provenance', async () => {
    const res = await EpicChainREST.tokenProvenance(
      '0x904deb56fdd9a87b48d89e0cc0ac3415f9207840',
      '31'
    )
    assert.equal(
      JSON.stringify(res[0]),
      JSON.stringify({
        blockheight: 3347807,
        timestamp: 1682517332,
        txid: '0xdc78f791dddaca469772f49a21431c85b53eb9bea5d3ac02a12aaa8e40c1ba7d',
        owner: 'XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R'
      })
    )
  })
})
