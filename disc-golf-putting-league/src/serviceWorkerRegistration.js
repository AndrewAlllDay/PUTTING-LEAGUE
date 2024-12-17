// serviceWorkerRegistration.js

// This code comes from create-react-app's default service worker file
// Register the service worker to make the app a PWA

export function register() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            navigator.serviceWorker
                .register(swUrl)
                .then((registration) => {
                    console.log("Service Worker registered: ", registration);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed: ", error);
                });
        });
    }
}

export function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}
