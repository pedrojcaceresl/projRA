// app/model/[id]/page.tsx
import ModelARClient from "./ModelARClient";
import BrainParts from "@/app/model/brain.model";

export async function generateStaticParams() {
	return BrainParts.map((m) => ({ id: m.id }));
}

export default function ModelPage({ params }: { params: { id: string } }) {
	return <ModelARClient id={params.id} />;
}
