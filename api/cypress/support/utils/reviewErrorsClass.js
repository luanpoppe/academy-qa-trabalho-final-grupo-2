export class ReviewErrors {
    id = {
        mustBeInteger: "movieId must be an integer number",
        mustNotBeEmpty: "movieId should not be empty",
    }

    score = {
        mustBeNumber: "score must be a number conforming to the specified constraints",
        mustNotBeEmpty: "score should not be empty",
        mustBeNotShortAndNotLong: "Score should be between 1 and 5",
    }

    text = {
        mustBeShorterAndLonger: "reviewText must be longer than or equal to 1 and shorter than or equal to 500 characters",
        mustBeLonger: "reviewText must be longer than or equal to 1 characters",
        mustBeShorter: "reviewText must be shorter than or equal to 500 characters",
        mustBeString: "reviewText must be a string"
    }
}