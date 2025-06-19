import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface UserType {
    userId: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: (auth: boolean) => void;
    apiBaseUrl: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const apiBaseUrl = import.meta.env.VITE_BACKEND_LIVE_URL;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/verify-token`,
                    {
                        method: "GET",
                        headers: {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json'
                        },
                        credentials: "include"
                    });
                const data = await res.json();
                if (res.ok) {
                    setIsAuthenticated(true);
                    setUser(data.user);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);
    return (
        <AuthContext.Provider value={{ apiBaseUrl, user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};