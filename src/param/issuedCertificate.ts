import { Certificate } from "./certificate";

export interface IssuedCertificate extends Certificate {
    issuer: string;
    institutionName: string;
}
  