export enum CompanySize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export type TCompany = {
  id?: number;
  name: string;
  size?: CompanySize;
};

export type SearchCompanyPayload = Partial<TCompany>
