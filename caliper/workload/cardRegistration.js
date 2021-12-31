'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const {nanoid} = require('nanoid');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }
    
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    }
    
    async submitTransaction() {
        // NOOP
        const card = {
            id: "C"+ nanoid(),
            cardNumber: "089099011110",
            fullName: "Huynh Le Ty",
            owner: "U" +nanoid(),
            dateOfBirth: "19/11/1999",
            gender: "Nam",
            address: "An Giang",
            nation: "VN",
            hometown: "LX",
            ethnic: "kinh",
            oldIdentityNumber:"011999101010",
            religion: "Phat giao",
            birthProvince: "An giang",
            career: "Student",
            currentAddress: "LX",
            dadName: "Nguyen A",
            educationLevel: "Dai hoc",
            householder: "Nguyen A",
            householderRelationship: "Chau",
            matrimony: "Chua ket hon",
            momName: "Le B",
            partnerName: "",
            registrationType: "Dang ky moi"
    }
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'createCardRegistration',
            invokerIdentity: 'User1',
            contractArguments: [JSON.stringify((card))],
            // contractArguments : [
            //     card.id,
            //     card.cardNumber,
            //     card.fullName,
            //     card.owner,
            //     card.dateOfBirth,
            //     card.gender,
            //     card.address,
            //     card.nation,
            //     card.hometown,
            //     card.ethnic,
            //     card.oldIdentityNumber,
            //     card.religion,
            //     card.birthProvince,
            //     card.career,
            //     card.currentAddress,
            //     card.dadName,
            //     card.educationLevel,
            //     card.householder,
            //     card.householderRelationship,
            //     card.matrimony,
            //     card.momName,
            //     card.partnerName,
            //     card.registrationType
            // ],
            //contractArguments: [car.id, car.engineNumber, car.chassisNumber, car.brand, car.model, car.color, car.year, car.capality, car.owner],
            // contractArguments:{
            //         id,
            //         cardNumber,
            //         fullName,
            //         owner,
            //         dateOfBirth,
            //         gender,
            //         address,
            //         nation,
            //         hometown,
            //         ethnic,
            //         oldIdentityNumber,
            //         religion,
            //         birthProvince,
            //         career,
            //         currentAddress,
            //         dadName,
            //         educationLevel,
            //         householder,
            //         householderRelationship,
            //         matrimony,
            //         momName,
            //         partnerName,
            //         registrationType
            //     },
            readOnly: false
        };

        await this.sutAdapter.sendRequests(myArgs);
    }
    
    async cleanupWorkloadModule() {
        // NOOP
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;