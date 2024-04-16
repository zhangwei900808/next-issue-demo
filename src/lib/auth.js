import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"


export const authOptions = {
    session: { strategy: "jwt" },
    // Configure one or more authentication providers
    pages: {
        signIn: '/login',
        //参考：https://www.soinside.com/question/uhkkM6TGRbh3vjxt8YJ5QQ
        error: '/login'
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // credentials: {
            //     userName: {label: "用户名", type: "text", placeholder: "用户名"},
            //     password: {label: "密码", type: "password"}
            // },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                console.log('------credentials -----', credentials)
                // const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/web/login`, {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const resData = await res.json()
                // console.log('login res user = ', resData)
                //
                // // If no error and we have user data, return it
                // if (res.ok && resData && resData.status === 0) {
                //     return resData.data
                // }
                // else if(resData.status !== 0){
                //     throw new Error("User was not found and could not be created.")
                // }
                // Return null if user data could not be retrieved
                // 注意：这里我们在login页面已经做好了登录验证工作，然后通过singin传递到这个页面把用户信息放入到session中，
                // 目的：为了解决return null时，login页面难以捕获错误信息，这种方法最简单
                // 参考：https://www.soinside.com/question/uhkkM6TGRbh3vjxt8YJ5QQ
                //问题：update时会有问题，因为当update获取 user信息时，我这里是没有添加获取用户信息的接口，而我是放到登录页面的，所以会有问题，这里需要登录接口，试一下调用update()方法时是走这里，还是走下面两个方法
                //解决：经过实践之后，发现没有问题，走的是jwt方法，没有走这里，
                //
                // 参考：https://next-auth.js.org/getting-started/client#updating-the-session
                if (credentials.session) {
                    return JSON.parse(credentials.session)
                }
                return null
            }
        })
    ],
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        // 当使用update()方法更新时，trigger=update session={你定义的值}，其它时候默认都是undefined
        async jwt({token, user, account, trigger, session}) {
            console.log('jwt user=', user)
            console.log('jwt token=', token)
            console.log('jwt account=', account)
            console.log('jwt trigger=', trigger)
            console.log('jwt session=', session)
            // if (user) token.role = user.role
            // token.avatar = user.avatar
            // token.avatar = user.avatar
            // if (user){
            //     token.avatar = user.avatar
            //     token.uid = user.uid
            // }
            return token
        },
        // If you want to use the role in client components
        async session({session, user, token}) {
            // 问题:如何把userId传递到session中，因为后续接口需要
            // 解决：需要从java后台返回access_token放到session中，然后请求java接口的时候axios带上这个token即可
            console.log('session session=', session)
            console.log('session user=', user)
            console.log('session token=', token)
            session.accessToken = token
            // if (session.user){
            //     session.user.avatar = session.token.avatar
            //     session.user.uid = session.token.uid
            // }
            return session
        },
    }
}

export const {
    handlers: {GET, POST},
    auth,
} = NextAuth(authOptions)