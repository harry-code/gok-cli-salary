import { Get, Post } from './../request';

export const uploadFiles = async (form: any) => {
    return await Post('/rest/salary/import', form);
};

export const exportFileApi = () => {
    return '/rest/salary/export';
};