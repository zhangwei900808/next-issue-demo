1、next.js14 + next-auth 
2、前端保存了用户信息的session到cookie中
3、前端通过axios请求接口后，后台接收


# 登录流程
1、使用next-auth设置登录页面
2、调用后台java接口返回用户信息+accessToken返回给前端
3、next-auth中将用户信息和accessToken加入到session中
4、next.js服务端和客户端就可以使用了，只需要在请求头中添加这个accessToken
5、next-auth的session数据和后台的accessToken数据都需要在过期之前更新，这个需要注意一下，
6、next-auth更新session如下所示：
```js
<SessionProvider // Re-fetch session every 5 minutes
//https://next-auth.js.org/getting-started/client#options
//https://next-auth.js.org/getting-started/client#refetching-the-session
    refetchInterval={5 * 60}
    refetchWhenOffline={false}
    // Re-fetches session when window is focused
    refetchOnWindowFocus={true}>
    {children}
</SessionProvider>
```
7、accessToken更新，则差不多，也是当用户切换页面显示的时候，就调用，按照原先的项目那一套来就好。