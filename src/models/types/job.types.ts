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

export type SaveJobPayload = {
  id?: number;
  title: string;
  description: string;
  url: string;
  type: JobType;
  locationType: JobLocationType;
  level: JobLevel;
  skills: string[];
  company: {
    id?: number;
    name?: string;
  };
  country: {
    id: string
  }
  province?: {
    id: number
  }
};
