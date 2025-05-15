# Vue3 TX 组件库发布指南

本文档提供将 Vue3 TX 组件库发布到 npm 的步骤说明。

## 准备工作

1. 确保你有一个 npm 账号，如果没有，前往 [npmjs.com](https://www.npmjs.com/) 注册
2. 在本地登录 npm 账号:
   ```bash
   npm login
   ```

## 发布前检查

1. 确保 `package.json` 中的版本号已更新
2. 确保所有代码已提交到代码仓库
3. 运行测试确保代码质量
   ```bash
   npm run test # 如果有测试脚本
   ```
4. 构建库文件
   ```bash
   npm run build:lib
   ```
5. 检查生成的 `dist` 目录，确保文件正确生成

## 发布流程

### 初次发布

如果是首次发布，直接运行:

```bash
npm publish
```

### 后续版本更新发布

1. 更新 `package.json` 中的版本号，遵循语义化版本控制规范:
   - 修复 bug: 增加修订号 (1.0.0 -> 1.0.1)
   - 添加新功能但保持向后兼容: 增加次版本号 (1.0.0 -> 1.1.0)
   - 有破坏性更新: 增加主版本号 (1.0.0 -> 2.0.0)

2. 可以使用 npm 命令自动更新版本号:
   ```bash
   # 补丁版本
   npm version patch
   
   # 次要版本
   npm version minor
   
   # 主要版本
   npm version major
   ```

3. 发布到 npm:
   ```bash
   npm publish
   ```

## 发布标签版本

如果想发布测试版本或预发布版本:

```bash
# 发布 beta 版
npm version 1.0.0-beta.1
npm publish --tag beta

# 发布 alpha 版
npm version 1.0.0-alpha.1
npm publish --tag alpha
```

## 发布后检查

1. 检查 npm 包页面是否更新: [https://www.npmjs.com/package/vue3-tx-component](https://www.npmjs.com/package/vue3-tx-component)
2. 创建新的 GitHub release 和标签
3. 更新文档网站

## 撤销发布

如果发现严重问题需要撤销发布(仅限发布后 24 小时内):

```bash
npm unpublish vue3-tx-component@0.1.0
```

## 注意事项

- 确保不要发布敏感信息
- 发布前务必在本地或测试环境测试安装和使用
- 遵循语义化版本控制规范，避免破坏用户项目
- 重要版本升级时，提前在 README 或文档中说明升级注意事项 