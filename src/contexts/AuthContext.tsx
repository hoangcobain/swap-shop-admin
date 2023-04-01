import { User } from 'src/types/user.type';
import { useState, createContext, useContext } from 'react';
import { getProfile } from 'src/utils/util';

export interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialAuthContext: AuthContextProps = {
    isAuthenticated: Boolean(getProfile()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null,
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialAuthContext.isAuthenticated,
    );

    const [profile, setProfile] = useState(initialAuthContext.profile);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
