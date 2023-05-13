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

export function getDates(startDate, endDate) {
    const dates: string[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dates.push(new Date(currentDate).toISOString());
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export const convertLocaleDateString = (date: string) => {
    const newDate = new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    return newDate;
};
