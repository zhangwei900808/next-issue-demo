import {auth} from "@/app/(auth)/auth";

export default async function Home() {
    const session = await auth()

    return (
        <main className="p-24">
            news page
            <div>
                {
                    session?.user.name? session?.user.name:<div>请登录</div>
                }
            </div>
        </main>
    );
}
