import { KmsKeyId } from '../kms';
import { AbstractPrivateKeyStore } from './abstract-key-store';

export class MemoryProviteKeyStore implements AbstractPrivateKeyStore {
  private _data: Map<string, string>;
  constructor() {
    this._data = new Map<string, string>();
  }
  async get(args: { alias: string }): Promise<string> {
    const privateKey = this._data.get(args.alias);
    if (!privateKey) {
      throw new Error('no key under given alias');
    }
    return privateKey;
  }
  async import(args: { alias: string; key: string }): Promise<void> {
    this._data.set(args.alias, args.key);
  }
}
