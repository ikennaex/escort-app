const isDev = true; // set to true for local development
const localhost = import.meta.env.VITE_LOCAL_HOST;
const live = import.meta.env.VITE_LIVE_HOST;
const liveTest = import.meta.env.VITE_LIVE_TEST_HOST;

// export const baseUrl = isDev ? localhost : live;
export const baseUrl = isDev ? localhost : liveTest;
 