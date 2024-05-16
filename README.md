# to-the-next / Cloudflare

nextjs 기반의 프로젝트 템플릿
Cloudflare 배포를 기반으로 작성된 템플릿입니다.

## 주의사항

- windows 개발환경에서는 정상 배포가 어렵습니다. github actions로 ci/cd설정, 또는 wsl로 작업해주시기 바랍니다.
- cloudflare pages는 edge runtime만 지원합니다. 빌드 시 아래와 같은 에러가 발생하는 경우 `export const rutime = 'edge'`를 page.tsx 또는 route.ts에 추가해주시기 바랍니다.

```
⚡️ ERROR: Failed to produce a Cloudflare Pages build from the project.
⚡️
⚡️      The following routes were not configured to run with the Edge Runtime:
⚡️        - /api/auth/[...nextauth]
⚡️
⚡️      Please make sure that all your non-static routes export the following edge runtime route segment config:
⚡️        export const runtime = 'edge';
⚡️
⚡️      You can read more about the Edge Runtime on the Next.js documentation:
⚡️        https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
```

## 배포 및 명령어

1. example.wrangler.toml 파일을 바탕으로 wrangler.toml 파일을 작성하세요.

```
# 프로젝트를 배포합니다.
pnpm run deploy

# 프로젝트를 배포환경으로 실행합니다.
pnpm run preview

# Cloudflare env를 자동생성합니다.
pnpm run cf-typegen
```

## 구성

### [패키지 매니저 : pnpm](https://pnpm.io/ko/)

### [DB 연결 도구 : Prisma](https://www.prisma.io/)

```
# db에 정의된 schema 가져오기
pnpx prisma db pull

# schema.prisma에 정의된 모델로 prisma provider 생성
pnpx prisma generate

# db 마이그레이션 하기
pnpx prisma migrate dev --name init
```

### [Component Library : shadcn/ui](https://ui.shadcn.com/)

### [사용자 인증 도구: Auth.js](https://authjs.dev/)

아래 명령어로 토큰 관리 secret을 자동생성하여 env로 관리하세요.

```
pnpx auth secret
```

세션관리를 prisma adaptor를 활용하게 설정되어있습니다.
