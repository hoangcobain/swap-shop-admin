import { User } from 'src/types/user.type';
import { useState, createContext, useContext, useEffect } from 'react';
import { useMeQuery } from 'src/hooks/useRequest';

export interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialAuthContext: AuthContextProps = {
    isAuthenticated: true,
    setIsAuthenticated: () => null,
    profile: {
        id: '1',
        username: 'awd',
        email: 'hoang210620012',
        address: 'quan',
        phoneNumber: 'awdawd',
        fullName: 'asd',
        birthday: 'asd',
        avatar: 'asd',
        rating: 12,
        createdDate: 'asd',
        updatedDate: 'asd',
    },
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
