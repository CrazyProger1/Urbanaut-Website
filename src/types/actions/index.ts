export type ActionError = {
  message: string;
  field?: string;
};

export type ActionResult = {
  success: boolean;
  errors?: ActionError[];
};
