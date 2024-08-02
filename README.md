# 기존 프로젝트를 next.js로 변경 연습

## Next.js 학습내용

글로벌 CSS는 root layout에서 import
   -
```
// app/layout.js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
```
font 최적화
   -
   - Next.js는 next/font 모듈을 통해 Google Fonts와 같은 외부 폰트를 빌드 시 다운로드합니다.
   - 빌드 시 폰트를 다운로드하므로 초기 로딩 시간이 단축됩니다.
   - 폰트 스왑으로 인한 레이아웃 시프트(CLS)를 방지할 수 있습니다.
   - 자체 호스팅으로 인해 외부 서비스에 대한 의존도가 줄어듭니다.
```
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
```
Image 컴포넌트
   -
   - 이미지 로드시 자동으로 레이아웃 이동 방지
   - 이미지 크기 조정
   - 이미지 지연로드
  
Link 컴포넌트
   -
   - 클라이언트 사이드 라우팅: 페이지 전체를 다시 로드하지 않고 필요한 부분만 업데이트합니다.
   - 자동 코드 스플리팅: 필요한 JavaScript만 로드하여 초기 로딩 시간을 줄입니다.
   - 프리페칭: 백그라운드에서 링크된 페이지를 미리 로드하여 빠른 전환을 제공합니다.
   - 접근성: 기본적으로 키보드 네비게이션을 지원합니다.
   - SEO 친화적: 검색 엔진이 링크를 쉽게 인식할 수 있습니다.
  
Suspense 컴포넌트
   -
   - 사용자 경험 향상: 전체 페이지 대신 일부분만 로딩 상태를 보여줄 수 있습니다.
   - 성능 최적화: 필요한 데이터나 컴포넌트만 로드하여 초기 로딩 시간을 줄입니다.
   - 점진적 로딩: 복잡한 UI를 단계적으로 로드할 수 있습니다.

URL 활용 (클라이언트 컴포넌트 vs 서버 컴포넌트)
   -
   - usePathnam: 현재 URL의 경로명을 반환 (클라이언트 컴포넌트에서 사용)
```
import { usePathname } from 'next/navigation';

export default function Component() {
  const pathname = usePathname();
  return <p>Current pathname: {pathname}</p>;
}
```
  - useSearchParams: 현재 URL의 쿼리 파라미터에 접근 (클라이언트 컴포넌트에서 사용)
```
import { useSearchParams } from 'next/navigation';

export default function Component() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  return <p>Search query: {query}</p>;
}
```
  - 페이지 컴포넌트 props ({ searchParams, params })
  - searchParams: 현재 URL의 쿼리 파라미터
  - params: 동적 라우트 세그먼트의 파라미터
```
export default function Page({ searchParams, params }) {
  return (
    <div>
      <p>Search query: {searchParams.query}</p>
      <p>Dynamic param: {params.id}</p>
    </div>
  );
}
```
Server Actions
  -
  - 서버에서 실행되는 비동기 함수
  - 클라이언트에서 직접 호출 가능
  - 폼 제출, 데이터 변경 등의 작업에 유용
  - 보안: 서버에서 실행되므로 민감한 로직을 클라이언트에 노출하지 않음
  - 성능: 서버에서 직접 데이터 처리, 네트워크 지연 감소
  - 자동 재검증: 관련 캐시를 자동으로 무효화하고 재검증
```
// app/actions.js
'use server';

export async function addTodo(formData) {
  const todo = formData.get('todo');
  // 데이터베이스에 todo 추가 로직
  console.log('Added todo:', todo);
}
```
```
// app/page.js
import { addTodo } from './actions';

export default function Page() {
  return (
    <form action={addTodo}>
      <input type="text" name="todo" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```
  - 클라이언트 컴포넌트에서 사용할 시 예시
```
'use client';

import { addTodo } from './actions';

export default function ClientComponent() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await addTodo(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 내용 */}
    </form>
  );
}
```
