// app/ar/[id]/page.tsx
import ARPageClient from "./ARPageClient";  // es un componente CLIENT

export default function ARPage({ params }: { params: { id: string } }) {
	return <ARPageClient id={params.id} />;
}
