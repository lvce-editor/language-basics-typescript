interface KeyObject {
  /**
   * Private keys in PEM format.
   */
  pem: string | Buffer;
  /**
   * Optional passphrase.
   */
  passphrase?: string | undefined;
}
