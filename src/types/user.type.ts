import { UserRole } from './user_role.type';

export interface User {
    id: string;
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    fullName: string;
    birthday: any;
    avatar: string;
    roles: UserRole[];
    status: string;
    createdDate: string;
    updatedDate: string;
}

export type UsersStatus = 'completed' | 'pending' | 'failed';
