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
  isValidate?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}
