
export default async function getData() {
  try {
    const response = await fetch('/api/getData');
    if (!response.ok) {
      throw new Error('Failed to get data');
    }
    const data = await response.json();
    return data.PEOPLE || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
