# 实训说明
<div style='text-align:center'>
	<img src="https://github.com/daifang/H5-App/blob/master/img/Logo-%E5%A4%A7.png" alt="Sample"  width="140" height="140" />
	<p>
		<em>logo</em>
	</p>
</div>

* # 后台人员
        ```
       //安装依赖包
       //切换到BackControl目录
       $ cd BackControl
       $ npm i 
       $ npm start
        ```
* # [后台项目地址]()
## ACG-Wiki
信息|-
-|-
名称|ACG-wiki
类型|网站
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
移动端站点|react
登录功能|express + session 状态保持 (参考 cookie 操作) 
密码加密|MD5加密
商城功能|React + postgresql 
购物车|postgresql 
数据存储|[postgresql](https://www.runoob.com/postgresql/postgresql-tutorial.html) 
后台支持|[express](http://www.expressjs.com.cn/guide/routing.html) + Nginx
服务器|云服务器(CentOS) 


## 后台进度
* #### 已基本完成 login_back.js |
* #### 2019-11-25 后台主要UI(已测试) -- daifang
* #### 2019-11-25 完成了数据库的初步设计 -- suhuijun
* #### 2019-11-26 后台系统管理员登录(已测试) -- daifang
* #### 2019-11-27 后台系统管理员注册(已测试) -- daifang
* #### 2019-11-27 完成了数据库的初步建设（11个表） -- suhuijun
* #### 2019-11-29 上午:后台系统管理员注册+邮箱激活(已测试) 下午:后台系统管理员密码md5加密(已测试) -- daifang
* #### 2019-11-29 晚上:后台登录+反馈页面移动端UI(已测试) || 后台系统登录健壮性优化(已测试) -- daifang 
* #### 2019-11-30 中午:前端登录+注册功能(未测试) -- daifang   <--
* #### 2019-11-30 根据实际应用情况对数据库进行了大幅度改动（表增加到12个） -- suhuijun
* #### 2019-12-1  
    * ##### 上午开始构建与后台数据库对接的API接口 -- suhuijun
    * ##### 中午发现漏洞:可以不用账户密码就可以登录(已解决) -- daifang 
    * ##### 下午更改项目目录结构,删除不必要文件 -- daifang 
* #### 2019-12-2
    * ##### 下午初步完成了API与后台数据库的对接 -- suhunjiun
* #### 2019-12-3
    * ##### 上午对与数据库对接的API进行了全面的测试 -- suhuijun
    * ##### 下午使用React重写后台管理系统UI -- daifang
    * ##### 下午发现nginx的跨域访问问题(已解决,配置nginx.config文件) -- daifang
    * ##### 编写接口文档 -- daifang
* #### 2019-12-4
	* ##### 上午完善各个接口 -- daifang
	* ##### 下午将后台管理系统部署到服务器,并实现Input可输入更改 -- daifang
* #### 2019-12-6
    * ##### 晚上完成所有数据接口 -- daifang
* #### 2019-12-7
    * ##### 完成admin的删除和修改信息功能 -- daifang
* #### 2019-12-9
    * ##### 完成所有改数据删数据查询数据功能post接口 -- daifang
## 前端进度

* #### 