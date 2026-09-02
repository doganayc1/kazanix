declare const require: any;

const Iyzipay = require("iyzipay");

let instance: any = null;

function getIyzipay() {
  if (instance) {
    return instance;
  }

  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const uri = process.env.IYZICO_URI;

  if (!apiKey || !secretKey || !uri) {
    throw new Error("IYZICO_ENV_MISSING");
  }

  instance = new Iyzipay({
    apiKey,
    secretKey,
    uri,
  });

  return instance;
}

function invoke(
  fn: (callback: (error: any, result: any) => void) => void
) {
  return new Promise<any>((resolve, reject) => {
    fn((error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

export async function createCheckoutForm(
  request: Record<string, unknown>
) {
  const iyzipay = getIyzipay();

  return invoke((callback) => {
    iyzipay.checkoutFormInitialize.create(
      request,
      callback
    );
  });
}

export async function retrieveCheckoutForm(
  request: Record<string, unknown>
) {
  const iyzipay = getIyzipay();

  return invoke((callback) => {
    iyzipay.checkoutForm.retrieve(
      request,
      callback
    );
  });
}
