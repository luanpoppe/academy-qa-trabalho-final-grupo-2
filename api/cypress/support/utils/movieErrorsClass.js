export class MovieErrors {
    titleErrors = {
        titleMustBeLonger: "title must be longer than or equal to 1 characters",
        titleMustBeShorter: "title must be shorter than or equal to 100 characters",
        titleMustBeString: "title must be a string",
        titleMustNotBeEmpty: "title should not be empty",
        titleMustBeShortherAndLonger: "title must be longer than or equal to 1 and shorter than or equal to 100 characters",
    }

    titleNonExistentErrors = [this.titleErrors.titleMustBeLonger, this.titleErrors.titleMustBeString, this.titleErrors.titleMustNotBeEmpty]

    genreErrors = {
        genreMustBeLonger: "genre must be longer than or equal to 1 characters",
        genreMustBeString: "genre must be a string",
        genreMustNotBeEmpty: "genre should not be empty",
        genreMustBeShorter: "genre must be shorter than or equal to 100 characters",
        genreMustBeShortherAndLonger: "genre must be longer than or equal to 1 and shorter than or equal to 100 characters"
    }

    allGenreErrors = [this.genreErrors.genreMustBeLonger, this.genreErrors.genreMustBeString, this.genreErrors.genreMustNotBeEmpty]

    descriptionErrors = {
        descriptionMustBeLonger: "description must be longer than or equal to 1 characters",
        descriptionMustBeString: "description must be a string",
        descriptionMustNotBeEmpty: "description should not be empty",
        descriptionMustBeShortherAndLonger: "description must be longer than or equal to 1 and shorter than or equal to 500 characters",
        descriptionMustBeShorter: "description must be shorter than or equal to 500 characters",
    }

    allDescriptionErrors = [this.descriptionErrors.descriptionMustBeLonger, this.descriptionErrors.descriptionMustBeString, this.descriptionErrors.descriptionMustNotBeEmpty]

    durationErrors = {
        durationMaxNumber: "durationInMinutes must not be greater than 43200",
        durationMinNumber: "durationInMinutes must not be less than 1",
        durationMustBeNumber: "durationInMinutes must be a number conforming to the specified constraints",
        durationMustBeInteger: "durationInMinutes must be an integer number",
        durationMustNotBeEmpty: "durationInMinutes should not be empty"
    }

    allDurationErrors = [
        this.durationErrors.durationMaxNumber,
        this.durationErrors.durationMinNumber,
        this.durationErrors.durationMustBeNumber,
        this.durationErrors.durationMustBeInteger,
        this.durationErrors.durationMustNotBeEmpty
    ]

    releaseYearErrors = {
        releaseYearMaxNumber: `releaseYear must not be greater than ${new Date().getFullYear()}`,
        releaseYearMinNumber: "releaseYear must not be less than 1895",
        releaseYearMustBeInteger: "releaseYear must be an integer number",
        releaseYearMustBeNumber: "releaseYear must be a number conforming to the specified constraints",
        releaseYearMustNotBeEmpty: "releaseYear should not be empty"
    }

    allReleaseYearErrors = [
        this.releaseYearErrors.releaseYearMaxNumber,
        this.releaseYearErrors.releaseYearMinNumber,
        this.releaseYearErrors.releaseYearMustBeInteger,
        this.releaseYearErrors.releaseYearMustBeNumber,
        this.releaseYearErrors.releaseYearMustNotBeEmpty
    ]

}