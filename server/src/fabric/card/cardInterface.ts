export interface Card {
    id: string;
    cardNumber?: string;
    fullName: string;
    owner: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    nation: string;
    hometown: string;
    ethnic?: string;
    oldIdentityNumber?: string;
    religion?: string;
    birthProvince?: string;
    bloodType?: string;
    career?: string;
    currentAddress?: string;
    dadName?: string;
    educationLevel?: string;
    householder?: string;
    householderRelationship?: string;
    matrimony?: string;
    momName?: string;
    partnerName?: string;
    registrationType?: string;
    picture?: string;
    fingerprints?: string;
    mail?: string;
    personalIdentitification?: string;
    dateOfExpirity?: string;
    createTime?: string;
    modifyTime?: string;
    modifyType?: string;
    modifyUser?: string;
    registrationTime?: string;
    registrationState?: string;
    registrationCity?: string;
    processPolice?: string;
    docType: string;
}
export class City {
    id: string;
    cityName: string;
    number?: string|string[];
    series?: string[];
    docType?: string;
    districtName?: string;
    currentNumber?: string;
    currentSerri?: string;
    headquartersAddress?: string;
}