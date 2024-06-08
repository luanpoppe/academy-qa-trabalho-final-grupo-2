export function createDefaultReviewBody(movieId) {
    const reviewBody = {
        movieId: movieId,
        score: 3,
        reviewText: "Review do filme",
    }

    return reviewBody
}