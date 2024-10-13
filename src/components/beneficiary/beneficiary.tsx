'use client';
import { useGetBeneficiaryQuery } from "@/queries/useBeneficiary";
import { useParams } from "next/navigation";

export default function Beneficiary() {

    const params = useParams();

    const BeneficiaryId = Number(params.beneficiaryId as string);

    const { data: initialData, refetch } = useGetBeneficiaryQuery({
        id: BeneficiaryId as number,
        enabled: Boolean(BeneficiaryId),
    });

    if (initialData) {
        const { id, user, situationDetail, supportReceived, verificationStatus } = initialData.payload;

        return (<>
            <div>
                <h1 className="text-3xl font-bold">Beneficiary #{id}</h1>
                <hr className="my-4" />
                <p className="text-xl">Posted user: {user.fullName} - {user.email}</p>
                <hr className="my-4" />
                <h2 className="text-2xl font-bold">Situation</h2>
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: situationDetail }}></p>
                <hr className="my-4" />
                <p className="text-lg text-red-500">Suggested support: {supportReceived}</p>
                <hr className="my-4" />
                <h2 className="text-2xl font-bold">Status</h2>
                <p className="text-lg">{verificationStatus ? "Verified" : "Not verified"}</p>
            </div>
        </>);
    }

    return (<>
        <div>Not found</div>
    </>);
}