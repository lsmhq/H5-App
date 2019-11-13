# 实训说明
<div style='text-align:center'>
	<img src="https://github.com/daifang/H5-App/blob/master/img/Logo-%E5%A4%A7.png" alt="Sample"  width="140" height="140" />
	<p>
		<em>logo</em>
	</p>
</div>

### 项目拉下来后执行以下

    ```
        //安装依赖包
        $ npm i
        //或者 
        $ yarn add 
        //运行
        //虚拟调试
        $ react-native run-android
        //真机调试
        //先用USB连接电脑，选择传输文件，打开开发人员选项选择USB调试
        //再运行
        $ react-native run-android
    ```
## 仓库分支
   * 为了前后端分离创建了两个分支
      * JavascriptWeb : 前端开发
      * Nodejs : 后台开发
## ACG-Wiki
信息|-
-|-
名称|ACG-wiki
类型|APP
主要功能|文章论坛
附加功能|周边交易

### 成员信息
姓名|身份职务
-|-
代天放|前端 (组件开发) , 后台开发
粟慧军|数据库设计 、后台开发
冯菲柯|前端开发 (页面开发)
赵晓宇|前端开发 (页面开发)
赵政|测试工程师 、前端开发

## 用到的技术 
 
功能|技术支持 
-|- 
移动端App|React Native 
加载动画|react-native-spinkit 
页面布局|[flex box](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool) 
聊天功能|React Native WebSocket + localstorage + [npm文档](https://www.npmjs.com/package/react-native-websocket) 
登录功能|express + session 状态保持 (参考 cookie 操作) 
商城功能|React Native + postgresql 
购物车|postgresql 
数据存储|[postgresql](https://www.runoob.com/postgresql/postgresql-tutorial.html) 
后台支持|[express](http://www.expressjs.com.cn/guide/routing.html) + Nginx
服务器|云服务器(CentOS) 
