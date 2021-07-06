import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

const Index = React.lazy(() => import('~/views/index/index'))

export default () => (
  <div className="page-content">
    <Suspense fallback={'正在加载...'}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path="/"><Index /></Route>
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </Suspense>
  </div >
)