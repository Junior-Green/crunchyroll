export function convertToSlug(inputString: string): string {
    // Remove all non-alphanumeric characters and convert to lowercase
    const lowercaseString = inputString.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
    // Replace spaces with hyphens
    const slug = lowercaseString.replace(/ /g, '-');

    return slug;
}

export function convertCommaDelimitedToArray(inputString: string): string[] {
    return inputString.split(',').map((str) => str.trim());
}

export function debounce(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timer: NodeJS.Timeout | null;
  
    return (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
  
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, delay);
    };
  }