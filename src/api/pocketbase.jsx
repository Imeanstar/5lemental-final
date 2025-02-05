import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PH_URL);

pb.autoCancellation(false);

export default pb;
