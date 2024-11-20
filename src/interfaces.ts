export interface IInterview {
  id: string;
  company: string;
  vacancyLink: string;
  hrName: string;
  contactTelegram?: string;
  contactWhatsApp?: string;
  contactPhone?: string;
  createdAt: Date;
  salaryFrom?: number;
  salaryTo?: number;
  stages?: IStage[];
  result?: 'Refusal' | 'Offer' | 'Pending';
}

export interface IStage {
  name: string;
  date: Date;
  description: string;
}
