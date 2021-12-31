/*
 * SPDX-License-Identifier: Apache-2.0
 */

import * as FabricCAServices from 'fabric-ca-client';
import { Wallets, X509Identity } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt'
import {createUser} from './fabric/user/registerUser'
import {initLedger} from './fabric/user/contractProcess'
async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname,  '..', '..','test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity: X509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        const user = {
            id: "admin",
            fullName: "admin",  
            password: bcrypt.hashSync("admin", 6),  
            role: "admin",      
            phoneNumber:"0822664657",
            dateOfBirth: "19/11/99",
            docType: "user"
        }
        await createUser(user,wallet,ccp);
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

main();
