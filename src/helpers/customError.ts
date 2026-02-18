export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errorCode?: string
  ) {
    super(message);
    this.name = "CustomError";
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}