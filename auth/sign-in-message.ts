import bs58 from "bs58";
import nacl from "tweetnacl";

type SignMessage = {
  domain: string;
  publicKey: string;
  nonce: string;
  issueDate: string;
};

const DEFAULT_STATEMENT =
  "To further protect your data, you are required to sign this request as proof of wallet ownership. This is request is free and will not trigger anything on-chain.";

export class SignInMessage {
  domain: string;
  publicKey: string;
  nonce: string;
  issueDate: string;

  constructor({ domain, publicKey, nonce, issueDate }: SignMessage) {
    this.domain = domain;
    this.publicKey = publicKey;
    this.nonce = nonce;
    this.issueDate = issueDate;
  }

  prepare() {
    return `Your connected Solana account: ${this.publicKey}\n
    ${DEFAULT_STATEMENT}\n
    Domain: ${this.domain}
    Nonce: ${this.nonce}
    Issued on: ${this.issueDate}
    `;
  }

  async validate(signature: string) {
    const msg = this.prepare();
    const signatureUint8 = bs58.decode(signature);
    const msgUint8 = new TextEncoder().encode(msg);
    const pubKeyUint8 = bs58.decode(this.publicKey);

    return nacl.sign.detached.verify(msgUint8, signatureUint8, pubKeyUint8);
  }
}