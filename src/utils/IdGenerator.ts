import IIDGenerator from './IIDGenerator';

// todo: convert into class?
const idGenerator: IIDGenerator = {
  generate(length: number = 8): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
};

export default idGenerator;
