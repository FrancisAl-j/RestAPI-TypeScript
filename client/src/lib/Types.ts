export type SigninType = {
  email: string;
  password: string;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
};

export type AuthTypes = {
  signin: (formData: SigninType) => void;
  signup: (formData: SignupType) => void;
  checkAuth: () => void;
  logout: () => void;
};
