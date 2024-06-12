const titleErrors = {
    titleMustBeLonger: "title must be longer than or equal to 1 characters",
    titleMustBeShorter: "title must be shorter than or equal to 100 characters",
    titleMustBeString: "title must be a string",
    titleMustNotBeEmpty: "title should not be empty",
    titleMustBeShortherAndLonger: "title must be longer than or equal to 1 and shorter than or equal to 100 characters",
}

const allTitleErrors = [titleErrors.titleMustBeLonger, titleErrors.titleMustBeString, titleErrors.titleMustNotBeEmpty]

const genreErrors = {
    genreMustBeLonger: "genre must be longer than or equal to 1 characters",
    genreMustBeString: "genre must be a string",
    genreMustNotBeEmpty: "genre should not be empty",
    genreMustBeShorter: "genre must be shorter than or equal to 100 characters",
    genreMustBeShortherAndLonger: "genre must be longer than or equal to 1 and shorter than or equal to 100 characters"
}

const allGenreErrors = [genreErrors.genreMustBeLonger, genreErrors.genreMustBeString, genreErrors.genreMustNotBeEmpty]

const descriptionErrors = {
    descriptionMustBeLonger: "description must be longer than or equal to 1 characters",
    descriptionMustBeString: "description must be a string",
    descriptionMustNotBeEmpty: "description should not be empty",
    descriptionMustBeShortherAndLonger: "description must be longer than or equal to 1 and shorter than or equal to 500 characters",
    descriptionMustBeShorter: "description must be shorter than or equal to 500 characters",
}

const allDescriptionErrors = [descriptionErrors.descriptionMustBeLonger, descriptionErrors.descriptionMustBeString, descriptionErrors.descriptionMustNotBeEmpty]

const durationErrors = {
    durationMaxNumber: "durationInMinutes must not be greater than 43200",
    durationMinNumber: "durationInMinutes must not be less than 1",
    durationMustBeNumber: "durationInMinutes must be a number conforming to the specified constraints",
    durationMustBeInteger: "durationInMinutes must be an integer number",
    durationMustNotBeEmpty: "durationInMinutes should not be empty"
}

const allDurationErrors = [
    durationErrors.durationMaxNumber,
    durationErrors.durationMinNumber,
    durationErrors.durationMustBeNumber,
    durationErrors.durationMustBeInteger,
    durationErrors.durationMustNotBeEmpty
]

const releaseYearErrors = {
    releaseYearMaxNumber: `releaseYear must not be greater than ${new Date().getFullYear()}`,
    releaseYearMinNumber: "releaseYear must not be less than 1895",
    releaseYearMustBeInteger: "releaseYear must be an integer number",
    releaseYearMustBeNumber: "releaseYear must be a number conforming to the specified constraints",
    releaseYearMustNotBeEmpty: "releaseYear should not be empty"
}

const allReleaseYearErrors = [
    releaseYearErrors.releaseYearMaxNumber,
    releaseYearErrors.releaseYearMinNumber,
    releaseYearErrors.releaseYearMustBeInteger,
    releaseYearErrors.releaseYearMustBeNumber,
    releaseYearErrors.releaseYearMustNotBeEmpty
]

const allNonExistentErrors = [
    ...allTitleErrors,
    ...allGenreErrors,
    ...allDescriptionErrors,
    ...allDurationErrors,
    ...allReleaseYearErrors
]

module.exports = {
    titleErrors,
    allTitleErrors,
    genreErrors,
    allGenreErrors,
    descriptionErrors,
    allDescriptionErrors,
    durationErrors,
    allDurationErrors,
    releaseYearErrors,
    allReleaseYearErrors,
    allNonExistentErrors
}