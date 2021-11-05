export class User{
  authorization: string;
  clinics: Array<any>;
  doctors: string
  type: string;
  emailVerified: boolean|any =  true;
  smsVerified: boolean|any = true;
  accountActivated: boolean|any = true;
  profileCreated: boolean|any = true;
  countryCode: string|any;
  constructor(authorization: string,clinics: any,doctors: string,type: string,emailVerified: boolean,smsVerified: boolean,accountActivated?: boolean,profileCreated?:boolean,countryCode?: string){
    this.authorization = authorization;
    this.type = type;
    this.clinics = clinics;
    this.doctors = doctors;
    this.emailVerified = emailVerified;
    this.smsVerified = smsVerified;
    this.accountActivated = accountActivated;
    this.profileCreated = profileCreated;
    this.countryCode = countryCode;
  }
}
