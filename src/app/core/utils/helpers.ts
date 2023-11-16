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

export function randomBoolean(): boolean {
  return Math.random() < 0.5
}

export function getRandomNumberBetween(x: number, y: number): number {
  if (x >= y) {
    throw new Error("Invalid range. 'x' must be less than 'y'.");
  }

  // Generate a random decimal number between 0 and 1
  const randomDecimal = Math.random();

  // Scale and shift the random decimal to your desired range [x, y]
  const randomNumber = x + randomDecimal * ((y - 1) - x);

  return Math.round(randomNumber);
}

export function roundToDecimal(num: number, precision: number): number {
  return parseFloat(num.toFixed(precision));
}