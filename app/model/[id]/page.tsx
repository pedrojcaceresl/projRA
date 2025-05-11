// app/model/[id]/page.tsx
import ModelARClient from "./ModelARClient";

export default function ModelPage({ params }: { params: { id: string } }) {
	return <ModelARClient id={params.id} />;
}
