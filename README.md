# Artale Frontend 코딩 테스트

이 프로젝트는 Artale의 프론트엔드 개발 과제를 위해 Next.js와 TypeScript를 사용하여 구현한 웹 애플리케이션입니다.

## 1. 프로젝트 실행 방법

먼저 필요한 패키지를 설치합니다.

```bash
npm install
# 또는
yarn install
```

다음으로, 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 추가해주세요. 이 환경 변수는 클라이언트 사이드에서 API 요청의 기본 URL을 설정하는 데 사용됩니다.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

그 다음, 개발 서버를 실행합니다.

```bash
npm run dev
# 또는
yarn dev
```

서버가 시작되면 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

## 2. 구현한 기능 범위

- **케이스 목록 조회 (/cases)**
  - 케이스 목록을 테이블 형태로 조회할 수 있습니다.
  - TanStack Query를 활용한 페이지네이션 기능이 구현되어 있습니다.
- **케이스 상세 정보 조회 (/cases/[id])**
  - 목록의 특정 케이스를 클릭하면 해당 케이스의 상세 정보 페이지로 이동합니다.
  - 케이스의 상세 정보, 원본 로그, 운영자 노트를 확인할 수 있습니다.
- **케이스 상태 변경**
  - 상세 페이지에서 케이스의 상태(예: 처리중, 해결, 보류)를 변경할 수 있습니다.
  - 변경된 상태는 API를 통해 서버에 업데이트되며, 이는 애플리케이션 전역 상태에 즉시 반영됩니다.
- **Mock API 서버**
  - 실제 백엔드 없이 기능을 구현하기 위해 Next.js의 Route Handlers를 사용하여 Mock API 서버를 구축했습니다.

## 3. 주요 기술적 결정과 그 이유

### **1) 데이터 페칭: TanStack Query (React Query) 도입**

**🎯 고민:** 케이스 목록의 페이지네이션과 같이 서버 상태와 비동기 데이터 로직을 효과적으로 관리할 방법이 필요했습니다. `useState`와 `useEffect`를 조합하여 직접 구현할 수도 있었지만, 이는 로딩/에러 상태 처리, 캐싱, 데이터 동기화 등에서 더 많은 보일러플레이트 코드를 유발합니다.

**💡 해결:** **TanStack Query**를 도입하여 서버 상태 관리를 선언적으로 처리했습니다.

- **페이지네이션 UX 개선:** `keepPreviousData` 옵션을 사용하여 페이지를 전환할 때 이전 데이터를 잠시 보여주어, 로딩 중 화면이 깜빡이는 현상을 방지하고 사용자 경험을 향상시켰습니다.
- **캐싱 및 성능 최적화:** 한 번 불러온 데이터는 캐시에 저장되어, 같은 페이지를 다시 방문할 때 API를 재요청하지 않고 캐시된 데이터를 즉시 보여주어 불필요한 네트워크 비용을 줄였습니다.
- **코드 간소화:** `isLoading`, `isError`, `data` 등의 상태를 자동으로 관리해주어, 비동기 로직과 관련된 코드를 크게 줄이고 컴포넌트가 UI 렌더링에만 집중할 수 있도록 했습니다.

```typescript
// src/app/cases/page.tsx
const { data, isLoading, isError, isFetching } = useQuery<
  CaseApiResponse,
  Error
>({
  queryKey: ["cases", page], // 페이지 번호를 queryKey에 포함하여 페이지별로 캐싱
  queryFn: () => fetchCases(page),
  placeholderData: keepPreviousData, // UX 향상을 위한 옵션
});
```

### **2) Mock 데이터 생성 관련**

**🎯 고민:** 단순히 몇 가지 정적인 데이터를 하드코딩하는 방식으로는 페이지네이션, 다양한 케이스 상태에 따른 UI 변화 등 동적인 기능을 충분히 테스트하기 어려웠습니다. 실제 운영 환경과 유사한, 양 많은 데이터셋이 필요했고 어떻게 생성할 수 있을지 고민이 있었습니다.

**💡 해결:** 자체적으로 mock 데이터 파일(`lib/mock-data/`)을 작성하여 현실적인 Mock 데이터를 동적으로 생성했습니다.

- **데이터의 일관성 및 관계 설정:** `generateCases`, `generateCaseDetails` 와 같은 함수를 통해 케이스 목록과 상세 정보가 `caseId`를 기준으로 일관된 관계를 갖도록 설계했습니다. 이를 통해 목록과 상세 페이지 간의 데이터 정합성을 보장할 수 있었습니다.
- **다양성 확보:** 랜덤 함수를 조합하여 케이스 이름, 담당자, 상태, 중요도 등 다양한 속성을 가진 데이터를 생성함으로써, 여러 엣지 케이스(예: 텍스트 길이가 길어질 때 UI가 깨지는지 여부)를 사전에 테스트하고 UI의 완성도를 높일 수 있었습니다.

이러한 동적 데이터 생성 방식은 초기 개발 단계에서 백엔드 API에 대한 의존도를 낮추고, 프론트엔드 개발의 자율성과 효율성을 향상시켰습니다.

### **3) 상태 관리: `global` 객체를 활용한 중앙 데이터 스토어 구축**

**🎯 고민:** 프로젝트 초기에는 Next.js 개발 서버의 HMR(Hot Module Replacement) 특성으로 인해 API 요청마다 Mock 데이터가 초기화되는 문제가 있었습니다. 각 API 라우트 파일이 독립된 모듈로 취급되어, 한 곳에서 데이터를 변경해도 다른 곳에 영향을 주지 못했습니다. 예를 들어, 상세 페이지에서 "검토 중"인 케이스 상태를 "조치 완료"로 변경하고 목록 페이지로 돌아와도 상태가 그대로 "검토 중"으로 남아있는 데이터 불일치 현상이 발생했습니다.

**💡 해결:** 이 문제를 해결하기 위해, Node.js 환경의 **global 객체**를 활용하여 애플리케이션의 생명주기 동안 한 번만 생성되고 유지되는 **중앙 데이터 저장소**(`lib/mock-data/store.ts`)를 구축했습니다.

```typescript
// lib/mock-data/store.ts
// ...
// global 객체에 데이터가 없으면 새로 생성하고, 있으면 기존 데이터를 사용
const globalForData = globalThis as unknown as {
  cases: Case[];
  caseDetails: Record<string, CaseDetail>;
  // ...
};

export const caseDB =
  globalForData.cases ?? (globalForData.cases = generateCases(100));
// ...
```

이 방식을 통해 모든 API 라우트가 동일한 데이터 인스턴스를 참조하게 만들어, 상태 변경이 애플리케이션 전반에 걸쳐 일관성 있게 유지되도록 만들었습니다. 이는 개발 환경에서의 제약을 창의적으로 해결한 핵심적인 기술적 결정이었습니다.


### **4) 아키텍처 관련**

- **Next.js App Router:** 파일 시스템 기반의 직관적인 라우팅을 위해 App Router를 활용했습니다.
- **컴포넌트 분리:** `CaseTable`, `Pagination`, `CaseStatusUpdater` 등 UI를 재사용 가능한 컴포넌트로 분리하여 코드의 유지보수성과 가독성을 높였습니다.
- **Client & Server Components:** 상호작용이 필요한 부분은 'use client'를 명시하여 클라이언트 컴포넌트로, 그 외에는 서버 컴포넌트의 이점을 활용하여 렌더링 성능을 최적화하는 전략을 사용했습니다.
