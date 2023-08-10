import { Nullable } from "./utilTypes";
import { ISO8601Date } from "./utilTypes";

export interface Documents {
  status: Status;
  data: DocumentData[];
}

export interface Document {
  status: Status;
  data: DocumentData;
}

export interface DocumentData {
  name: string;
  creatorName: Nullable<string>;
  signingMethod: SigningMethod;
  language: Language;
  basePdf: File;
  id?: string;
  templateId?: string;
  companyId?: string;
  clientId?: Nullable<string>;
  stage?: Stage;
  createdAt?: ISO8601Date;
  updatedAt?: ISO8601Date;
  signatures?: Signature[];
}

export interface Signature {
  firstName: string;
  lastName: string;
  type: SignatureType;
  id?: string;
  createdAt?: ISO8601Date;
  updatedAt?: ISO8601Date;
  state?: State;
  signedAt?: Nullable<ISO8601Date>;
  cancelledAt?: Nullable<ISO8601Date>;
  companyTitle?: Nullable<string>;
  companyIdent?: Nullable<string>;
  redirectUrl?: Nullable<string>;
  email?: Nullable<string>;
  phone?: Nullable<string>;
  invitation?: Invitation;
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

export enum Language {
  Fi = "fi",
  En = "en",
  Se = "se",
}

export enum Stage {
  Created = "created", // New Document
  Finalized = "finalized", // Document is ready to be signed
  Completed = "completed", // Document is signed
}

export enum State {
  Waiting = "waiting",
  Completed = "completed",
}
