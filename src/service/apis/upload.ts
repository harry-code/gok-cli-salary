import { Post } from './../request';

export const UploadFiles = async (data: any) => {
    return await Post('/upload/files', data);
};