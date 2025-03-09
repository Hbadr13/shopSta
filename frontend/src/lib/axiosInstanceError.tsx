import { AxiosError } from 'axios';

const handleAxiosError = (error: unknown, rejectWithValue: (value: unknown) => unknown) => {
    if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message);
    } else if (error instanceof Error) {
        return rejectWithValue(error.message);
    } else {
        return rejectWithValue('An unexpected error occurred');
    }
};
export { handleAxiosError }