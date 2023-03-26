export interface User {
    id: string;
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    fullName: string;
    birthday: any;
    avatar: string;
    rating: number;
    createdDate: string;
    updatedDate: string;
}

export type UsersStatus = 'completed' | 'pending' | 'failed';
