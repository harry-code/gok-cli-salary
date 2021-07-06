import React, { useEffect } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import { UploadFiles } from '~/service/apis/upload';
import './index.less';

const { Dragger } = Upload;

export default () => {

    const props = {
        name: 'file',
        multiple: true,
        accept: '.xlsx',
        action: 'http://127.0.0.1:7001/upload/files',
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
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
        </div>
    )
}