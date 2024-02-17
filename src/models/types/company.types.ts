export enum CompanySize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export type SaveCompanyPayload = {
  id?: number;
  name: string;
  size?: CompanySize;
};

export type SearchCompanyPayload = Partial<SaveCompanyPayload>
