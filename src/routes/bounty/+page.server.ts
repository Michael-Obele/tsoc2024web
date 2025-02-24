import { Root } from '$lib/contracts/root';
import { DefaultProvider, bsv } from 'scrypt-ts';
import { NeucronSigner } from 'neucron-signer';
import artifact from '../../../artifacts/root.json';

const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
const signer = new NeucronSigner(provider);
await signer.login('sales@timechainlabs.io', 'string');
await Root.loadArtifact(artifact);
let instance: any;

export const actions = {
  deploy: async ({ request }) => {
    const data = await request.formData();
    let bounty = Number(data.get('bounty'));
    let square = BigInt(Number(data.get('square')));

    instance = new Root(square);
    await instance.connect(signer);

    try {
      const deployTx = await instance.deploy(bounty);
      console.log(
        'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
      );

      return { deployed: true, txid: deployTx.id };
    } catch (error: any) {
      return { deployed: false, txid: error.message };
    }
  },

  unlock: async ({ request }) => {
    // Retrieve data from the form
    const data = await request.formData();
    const root = Number(data.get('root'));

    await instance.connect(signer);
    // Call the unlock method
    try {
      const { tx: callTx } = await instance.methods.unlock(root);
      console.log(
        'contract unlocked successfully : https://whatsonchain.com/tx/' +
          callTx.id
      );
      return { unlock: true, txid: callTx.id };
    } catch (error: any) {
      console.log(error.message);
      return { unlock: false, txid: error.message };
    }
  },
};
