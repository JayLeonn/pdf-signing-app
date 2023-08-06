import { Nullable } from "./utilTypes";
import { ISO8601Date } from "./utilTypes";

export interface Documents {
  status: Status;
  data: Document[];
}

export interface Document {
  id: string;
  templateId: string;
  companyId: string;
  clientId: Nullable<string>;
  name: string;
  creatorName: Nullable<string>;
  signingMethod: SigningMethod;
  language: string;
  stage: string;
  createdAt: ISO8601Date;
  updatedAt: ISO8601Date;
  signatures: Signature[];
}

export interface Signature {
  id: string;
  createdAt: ISO8601Date;
  updatedAt: ISO8601Date;
  state: string;
  signedAt: Nullable<ISO8601Date>;
  cancelledAt: Nullable<ISO8601Date>;
  firstName: string;
  lastName: string;
  companyTitle: Nullable<string>;
  companyIdent: Nullable<string>;
  redirectUrl: Nullable<string>;
  type: SignatureType;
  email: string;
  phone: Nullable<string>;
  invitation: Invitation;
}

export interface Invitation {
  url: string;
  pin: string;
}

export interface Status {
  code: number;
  total: number;
}

export enum SigningMethod {
  Canvas = "canvas",
  Strong = "strong",
}

export enum SignatureType {
  Person = "person",
  Company = "company",
}
