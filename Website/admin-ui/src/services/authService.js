/*export const login = async (credentials) => {
    try {
        if (!window.electron || !window.electron.invoke) {
            return { success: false, message: "Electron IPC is no   t available in this context" };
        }
        return await window.electron.invoke('auth:login', credentials);
    } catch (error) {
        return { success: false, message: error.response ? error.response.data : "Network Error" };
    }
};*/
export const login = async (credentials) => {
    try {
        // Using standard fetch to talk to our Express backend
        const response = await fetch('/api/admin/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // THIS IS CRITICAL: It allows the browser to save the session cookie!
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            // If login fails (e.g., wrong password), return the error message
            return { success: false, message: data.message || "Login failed" };
        }

        // If login is successful!
        return { success: true, message: data.message, user: data.user };
    } catch (error) {
        return { success: false, message: "Network Error" };
    }
};