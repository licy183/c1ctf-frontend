# c1ctf-frontend

## 配置修改

### 生产环境配置文件

```
.env 
```

### 开发环境配置文件

```
.env.development
```

修改vue.config.js

```
const proxy_url = 'http://127.0.0.1:8082/api';
```


## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
