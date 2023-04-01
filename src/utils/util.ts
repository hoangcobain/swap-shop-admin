import { User } from 'src/types/user.type';

export function clearLocalStorage() {
    localStorage.removeItem('profile');
}

export function getProfile(): User | null {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
}

export function saveProfile(profile: User) {
    localStorage.setItem('profile', JSON.stringify(profile));
}
