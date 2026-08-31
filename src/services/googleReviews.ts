const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface GoogleReview {
  authorName: string;
  authorPhoto: string;
  rating: number;
  text: string;
  publishTime: string;
  relativePublishTimeDescription: string;
}

export interface GoogleReviewsData {
  businessName: string;
  rating: number;
  totalReviews: number;
  googleMapsUrl: string;
  reviews: GoogleReview[];
}

export interface ApiResponse {
  success: boolean;
  data?: GoogleReviewsData;
  message?: string;
}

export async function getGoogleReviews(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/google-reviews`, {
      next: { revalidate: 3600 }, // Cache on frontend for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching Google Business Profile reviews:', error);
    return {
      success: false,
      message: error.message || 'Unable to fetch Google reviews.',
    };
  }
}
