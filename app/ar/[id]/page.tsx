// app/ar/[id]/page.tsx
import BrainParts from "@/app/model/brain.model";
import ARPageClient from "./ARPageClient";  // es un componente CLIENT

export async function generateStaticParams() {
	return BrainParts.map((m) => ({ id: m.id }));
}

export default function ARPageWrapper({ params }: { params: { id: string } }) {
	return <ARPageClient id={params.id} />;
}
