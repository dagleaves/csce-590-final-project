export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  grade: string;
  userType: string;
  username: string;

  achievements: Achievement[];
};

export type HomeCertificate = {
  certification: string;
  certificateLevel: string;
  certifiedDate: string;
  status: string;
  expiryDate: string;
};

export type DashboardCertificate = {
  employeeId: number;
  fullname: string;
  role: string;
  grade: string;
  email: string;
  certificateName: string;
  certificateLevel: string;
  certifiedDate: string;
  expiryDate: string;
};

export type Certificate = {
  name: string;
  level: string;
  category: string;
};

export type Achievement = {
  id: number;
  certifiedDate: string;
  employee: Employee;
  certificateName: string;
  certificate: Certificate;
};
