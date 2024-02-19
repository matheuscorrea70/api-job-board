import { type FindOperator } from "typeorm";

export enum JobLocationType {
  Hybrid = "Hybrid",
  OnSite = "On-site",
  Remote = "Remote",
}

export enum JobType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Contract = "Contract",
  Temporary = "Temporary",
  Volunteer = "Volunteer",
  Internship = "Internship",
  Other = "Other",
}

export enum JobLevel {
  Internship = "Internship",
  EntryLevel = "Entry level",
  Associate = "Associate",
  MidSenior = "Mid-Senior level",
  Director = "Director",
  Executive = "Executive",
}

export type TJobCompany = {
  id?: number;
  name: string;
};

export type TJobCountry = {
  id: string;
};

export type TJobProvince = {
  id: number;
};

export type TJob = {
  id?: number;
  title: string;
  description: string;
  url: string;
  type: JobType;
  locationType: JobLocationType;
  level: JobLevel;
  skills: string[];
  company: TJobCompany;
  country: TJobCountry;
  province?: TJobProvince;
};

export type SearchJobPayload = {
  title?: FindOperator<string>;
  description?: FindOperator<string>;
  type?: JobType;
  locationType?: JobLocationType;
  level?: JobLevel;
  company?: Partial<TJobCompany>;
  country?: Partial<TJobCountry>;
};
