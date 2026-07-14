import { apiFetch } from '@/src/lib/apiClient';
import ListingDetail from '@/src/features/listings/components/ListingDetail';

export default async function ListingPage({ params }) {
  const { id } = await params;

  const listing = await apiFetch(`/listings/${id}`).catch((err) => {
    console.error('Failed to fetch listing:', err);
    return null;
  });   

  if (!listing) {
    return (
      <div className="text-center py-20 text-red-500">
        Product not found.
      </div>
    );
  }

  return <ListingDetail listing={listing} />;
}