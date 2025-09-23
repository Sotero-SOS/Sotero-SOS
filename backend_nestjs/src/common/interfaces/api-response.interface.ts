// Interfaces para padronizar respostas da API em todo o projeto
export interface ApiResponse<T> {
    data: T;
    message?: string;
    meta?: ApiMeta;
}

export interface ApiError {
    error: string;
    statusCode: number;
    details?: any;
}

export interface ApiMeta {
    count?: number;
    page?: number;
    totalPages?: number;
}