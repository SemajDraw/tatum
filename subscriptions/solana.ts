import { createNewSubscription, CreateSubscription, Currency, SubscriptionType } from '@tatumio/tatum';
import { delay } from '../utils/utils.js';

const addresses: string[] = ['YOUR_SOLANA_ADDRESS_HERE', ]; // Replace with the Solana addresses you want to subscribe to (Max 10 check DOCs "https://apidoc.tatum.io/#tag/Notification-subscriptions")
const webhookUrl: string = 'YOUR_WEBHOOK_URL_HERE'; // Replace with the URL you want to send your HTTP POST webhook to (View payload structure in docs https://apidoc.tatum.io/#operation/createSubscription)


export const createAddressNotificationTransactionSubscription = async (address: string, subscriptionType: SubscriptionType = SubscriptionType.ADDRESS_TRANSACTION): Promise<{ id: string; }>  => {

    await delay(1000); // Pause for 1 second to not hit api limit

    const data: CreateSubscription = {
        'type': subscriptionType,
        'attr': {
            'address': address,
            'chain': Currency.SOL,
            'url': webhookUrl
        }
    };

    return createNewSubscription(data);
}

const subscribe = async () => {
    await Promise.allSettled(addresses.map((address) => createAddressNotificationTransactionSubscription(address)))
    .then((values) => {
        console.log(values);
    })
    .catch((error) => {
        console.log(`Error: ${error.response.data.message}\n`);
    });
}


export { subscribe };