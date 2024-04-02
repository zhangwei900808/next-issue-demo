import {auth} from "@/app/(home)/auth";

export default async function ServerPage() {
    const session = await auth()
    console.log('----sessions-----', session)

    return <div className="flex flex-col gap-6">
        sdfsdfdsfsdf{session}
    </div>
}
