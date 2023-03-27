export interface SuccessResponse<Data> {
    message: string;
    success: boolean;
    code: number;
    data: Data;
}
