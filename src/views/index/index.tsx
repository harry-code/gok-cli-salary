import React, { useState } from 'react';
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { API_URL } from '~/service/request';
import { exportFileApi, uploadFiles } from '~/service/apis/upload'
import './index.less';

const { Dragger } = Upload;

export default () => {
    const [flag, setFlag] = useState<boolean>(false);
    let formData = new FormData();
    const props = {
        multiple: true,
        showUploadList: false,
        accept: '*',
        beforeUpload: (file: any) => {
            formData.append(`file_${file.uid}`, file);
        },
        customRequest: async (e: any) => {
            try {
                if (!flag) {
                    setFlag(true);
                    const res = await uploadFiles(formData);
                    if (res.code === 200) {
                        message.success('上传成功');
                        setFlag(false);
                        window.location.href = `${API_URL[process.env.NODE_ENV || 'production']}${exportFileApi()}`
                    } else {
                        message.error(res.msg);
                        setFlag(false);
                    }
                }
            } catch (error) {
                setFlag(false);
                throw new Error(error);
            }
        },
        // onDrop(e: { dataTransfer: { files: any; }; }) {
        //     console.log('Dropped files', e.dataTransfer.files);
        // },
    };
    return (
        <div className="salary">
            <h2>
                国科薪资计算小工具
            </h2>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖动文件进行上传</p>
                <p className="ant-upload-hint">
                    支持单个或者批量上传
                </p>
            </Dragger>
            {
                flag ? (
                    <Spin tip="正在上传中，请稍后"></Spin>
                ) : null
            }
        </div>
    )
}