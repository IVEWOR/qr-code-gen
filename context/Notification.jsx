"use client";

import { createContext, useState } from "react";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [alert, setAlert] = useState(null);
    return (
        <NotificationContext.Provider value={{ setAlert }}>
            {children}
        </NotificationContext.Provider>
    )
}