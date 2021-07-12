import React, { useState } from 'react';
import { Upload, message, Spin, Alert } from 'antd';
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
                        window.location.href = `${API_URL[process.env.NODE_ENV || 'production']}${exportFileApi()}`
                    }
                }
            } catch (error) {
                setFlag(false);
                throw new Error(error);
            }
        },
        onDrop(e: { dataTransfer: { files: any; }; }) {
            console.log('Dropped files', e.dataTransfer.files);
        },
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
            {/* {
                isShow ? (
                    <Spin tip="正在计算中，请稍后">
                        <Alert
                            message="文件上传正在计算中..."
                            description="文件内容计算..."
                            type="info"
                        />
                    </Spin>
                ) : null
            } */}
        </div>
    )
}