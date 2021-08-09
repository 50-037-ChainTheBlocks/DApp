import { Certificate } from './certificate';

export interface IssuedCertificate extends Certificate {
  issuer: string;
  institutionName: string;
}

export const isIssuedCertificate = (arg: any): arg is IssuedCertificate => {
  // Stupid way of checking, change if possible
  const propertyCheck =
    'name' in arg &&
    typeof arg.name === 'string' &&
    'course' in arg &&
    typeof arg.name === 'string' &&
    'degree' in arg &&
    typeof arg.degree === 'string' &&
    'graduatingYear' in arg &&
    typeof arg.graduatingYear === 'string' &&
    'enrolledYear' in arg &&
    typeof arg.enrolledYear === 'string' &&
    'recipient' in arg &&
    typeof arg.recipient === 'string' &&
    'issuer' in arg &&
    typeof arg.issuer === 'string' &&
    'institutionName' in arg &&
    typeof arg.institutionName === 'string';
  return arg && propertyCheck;
};
