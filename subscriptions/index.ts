import { cancelExistingSubscription, listActiveSubscriptions } from '@tatumio/tatum';
import { subscribe as SOLSubscribe } from './solana.js';

// Initialize all subscriptions
const initializeSubscriptions = async () => {
    await SOLSubscribe();
};

// List all active subscriptions
const listSubscriptions = async () => {
    const subscriptions = await listActiveSubscriptions();

    console.log(`Subscriptions: ${subscriptions.length}`);
    subscriptions.forEach((subscription: any, i: number) => console.log(`${i + 1} : ${JSON.stringify(subscription, null, 2)}`));
};

// Cancel all active subscriptions
const cancelAllSubscriptions = async (subscriptionIds?: string[]) => {
    const subscriptions: string[] = subscriptionIds || await (await listActiveSubscriptions()).map((subscription) => subscription.id);

    await Promise.allSettled(subscriptions.map((subscription) => cancelExistingSubscription(subscription)))
    .then((values) => {
        console.log(values);
    })
    .catch((error) => {
        console.log(`Error: ${error.response.data.message}\n`);
    });
}

export { cancelAllSubscriptions, listSubscriptions, initializeSubscriptions };
