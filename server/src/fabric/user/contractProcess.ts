import { Gateway, Wallets, Contract, Wallet } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

/*export async function getUserContract(identifyPayload: any): Promise<Contract> {
    
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..','..', '..','test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get(identifyPayload);
    if(typeof(identity)===undefined){
        throw new Error (" Khong tim thay Identity");
    }
    const gateway = new Gateway();
    await gateway.connect(ccp, { 
        wallet, 
        identity: identifyPayload, 
        discovery: { 
            enabled: true, 
            asLocalhost: true 
        } 
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('CRChaincode','User');
    return contract;
}*/
export function getCcp(): any {
    const ccpPath = path.resolve(__dirname, '..', '..', '..','..','test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
    return JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
}

export async function getWallet(): Promise<Wallet> {
    const walletPath = path.join(process.cwd() ,'wallet');
    return await Wallets.newFileSystemWallet(walletPath);
}

export async function getUserContract(identifyPayload: any): Promise<Contract> {
    const ccp = getCcp();
    const wallet = await getWallet();
    const identity = await wallet.get(identifyPayload);
    if (typeof identity === 'undefined') {
        throw new Error("khong ton tai identity")
    }
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: identifyPayload,
        discovery: {
            asLocalhost: true,
            enabled: true,
        },
    });
    const channel = await gateway.getNetwork('mychannel');
    const contract = channel.getContract('CRChaincode', 'User');
    return contract;
}

export async function initLedger(){
    try{
        const contract = await this.getUserContract('admin');
        await contract.submitTransaction('initLedger');
        console.log('Sample Users have been added into ledger')
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}