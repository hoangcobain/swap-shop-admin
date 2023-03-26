export interface SuccessResponse<Data> {
    message: string;
    sucess: boolean;
    code: number;
    data: Data;
}
