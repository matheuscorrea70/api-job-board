export type SaveJobPayload = {
  id?: number;
  title: string;
  description: string;
  url: string;
  company: {
    id?: number;
    name?: string;
  };
};
