export function convertToSlug(inputString: string): string {
    // Remove all non-alphanumeric characters and convert to lowercase
    const lowercaseString = inputString.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
    // Replace spaces with hyphens
    const slug = lowercaseString.replace(/ /g, '-');

    return slug;
}