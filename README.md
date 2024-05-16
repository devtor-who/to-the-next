# to-the-next

nextjs 기반의 프로젝트 템플릿

template을 추가하려면 아래와 같이 진행해주세요.

```
git remote add template https://github.com/devtor-who/to-the-next.git

# ec2 template 사용하기
git fetch --all
git merge template/aws-ec2 --allow-unrelated-histories

# cloudflare template 사용하기
git fetch --all
git merge template/cloudflare --allow-unrelated-histories
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
