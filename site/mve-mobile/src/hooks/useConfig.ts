import { createContext } from 'mve-core';
import { GlobalConfigProvider } from '../config-provider/type';

// 创建配置上下文
const ConfigContext = createContext<{ globalConfig: GlobalConfigProvider }>({
  globalConfig: {
    classPrefix: 't',
  },
});

// 获取全局 globalConfig
export default (): GlobalConfigProvider => ConfigContext.consume().globalConfig;
