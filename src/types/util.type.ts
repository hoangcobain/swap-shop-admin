export interface SuccessUserResponse<Data> {
    message: string;
    success: boolean;
    code: number;
    user: Data;
}
