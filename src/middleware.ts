import { type NextRequest } from 'next/server';
import updateSession from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // 更新用戶認證會話
  const response = await updateSession(request);

  // 檢查是否需要重定向
  if (response.status === 307) {
    return response; // 返回重定向響應
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * 匹配所有請求路徑，但以下路徑除外：
     * - _next/static（靜態文件）
     * - _next/image（圖像優化文件）
     * - favicon.ico（網站圖標文件）
     * - /login (登入頁面)
     * 可以根據需要修改此模式以包含更多路徑。
     */
    '/((?!_next/static|_next/image|favicon.ico|login|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
