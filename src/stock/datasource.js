
export async function fetchStocks(count = 20) {
  const fetchResult = await fetch(`http://localhost:8000/?count=${count}`);

  return await fetchResult.json();
}

