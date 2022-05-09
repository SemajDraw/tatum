import { cancelAllSubscriptions, listSubscriptions, initializeSubscriptions } from './subscriptions/index.js';

process.env.TATUM_API_KEY = "YOUR_TATUM_API_KEY_HERE"; // Replace with your api key

const main = async () => {
    await initializeSubscriptions();

    await listSubscriptions();

    // WARNING - Uncommenting this function call will cancel all active subscriptions
    // await cancelAllSubscriptions();
};

await main();