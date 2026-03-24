'use server'

export async function submitRating(pageUrl: string, rating: number): Promise<void> {
  // TODO: persist to database
  console.log(`Rating submitted: ${rating} for ${pageUrl}`)
}
