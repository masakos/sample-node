// サーバーとの通信をこのファイルに集約する。
// コンポーネント側は「どうやって通信するか」を知らなくてよい(関心の分離)。
const API_URL = new URL('/api/greet', import.meta.env.VITE_API_BASE_URL);

export async function fetchGreeting(name) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'サーバーエラーが発生しました');
  }

  return response.json();
}
