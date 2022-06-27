export interface IForm {
  name: string;
  email: string;
  phone: string;
  birth: boolean;
  message: boolean;
}

export interface IState {
  errorName?: boolean;
  errorEmail?: boolean;
  errorPhone?: boolean;
  errorBirth?: boolean;
  errorMessage?: boolean;
  cardsArray: IForm[];
  disSubmit?: boolean;
  isValidate?: boolean;
}
