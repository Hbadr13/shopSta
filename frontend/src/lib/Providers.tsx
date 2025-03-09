'use client'; // ✅ Mark this as a Client Component
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
};

export default Providers;
