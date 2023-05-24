import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from './styles.module.css';
 
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { useCallback, useEffect, useState } from "react"

import { IDL, NearAddressStorage} from "../../near_address_storage"


const PROGRAM_ID = `EyhWgWKB81CJAbZ2aeV7ppjKwTr3uuJ3NqrP8nRrhoWs`


export default function Card() {
  const [program, setProgram] = useState<anchor.Program<NearAddressStorage>>()
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const walletInstance = useWallet()
  const [nearAddress, setNearAddress] = useState('');
  const [solanaPDAAddress, setSolanaPDAAddress] = useState<string | null>(null);


  const loadUserData = useCallback(async () =>{
    if(!wallet?.publicKey){ 
      setNearAddress('')
      return
    };
    try {
      const [userDataAccount] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user_data"), wallet.publicKey.toBytes()],
        new anchor.web3.PublicKey(PROGRAM_ID)
      );
        
      const data = await program.account.userData.fetch(userDataAccount.toString());
      if(!data) return
      const nearAccount = new TextDecoder().decode(Uint8Array.from(data.nearAddress));
      setNearAddress(nearAccount);
      setSolanaPDAAddress(userDataAccount.toString());
    }
    catch(e){
      console.log('user not found', e)
    }
  } ,[program, wallet?.publicKey])

  useEffect(() => { loadUserData() },[loadUserData])


  useEffect(() => {
    let provider: anchor.Provider
    if(!wallet) return;
    try {
      provider = anchor.getProvider()
    } catch {
      provider = new anchor.AnchorProvider(connection, wallet, {})
      anchor.setProvider(provider)
    }

    const program = new anchor.Program(IDL, PROGRAM_ID)
    setProgram(program)
  }, [wallet, connection])

  const onChange = (e) => {
    setNearAddress(e.target.value);
  }

  const sendTransaction = useCallback(async () => {
    const [userDataAccount, userDataBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user_data"), wallet.publicKey.toBytes()],
      new anchor.web3.PublicKey(PROGRAM_ID)
    );
    if(!nearAddress) return;
    const padBuff = Buffer.concat([Buffer.from(nearAddress), Buffer.alloc(64 - wallet.publicKey.toBuffer().length)], 64);

    const uint8array = new Uint8Array(padBuff.buffer, padBuff.byteOffset, padBuff.length / padBuff.BYTES_PER_ELEMENT);
    const args = Array.from(uint8array);

    await program.methods
      .createUserData(args, Number(userDataBump.toString()))
      .accounts({
        signer: wallet.publicKey,
        userData: userDataAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()
    await loadUserData()
  }, [program,nearAddress, wallet?.publicKey, loadUserData])

  return <div className={styles.card}>
    <h1 className={styles.title}>OnMachina refund program</h1>
    <p className={styles.description}>According to that program Allbridge is a decentralized, modular, and expanding token bridge with on-chain consensus. It’s a simple, modern, and reliable way to transfer assets between blockchain networks. Allbridge mission is to make the blockchain world borderless and provide a tool to freely move assets between different networks. In the future it will evolve into a DAO-style multi-chain hub, establishing connections between the EVM and non-EVM networks.</p>
    <div className={styles.inputWrapper}>
      <input disabled={!!solanaPDAAddress} value={nearAddress} onChange={onChange} className={styles.input} /> 
      {walletInstance.connected ? <button disabled={!!solanaPDAAddress} onClick={sendTransaction} className={styles.sendButton}>{!!solanaPDAAddress ? 'Address Submitted':'Send NEAR Address'}</button> : <WalletMultiButton className={styles.connectButton} />}
    </div>
  </div>;
}