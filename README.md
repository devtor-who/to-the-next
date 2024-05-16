# to-the-next / AWS-EC2

nextjs 기반의 프로젝트 템플릿
Aws ec2 인스턴스에 배포하기위한 ci/cd가 구성되어있습니다.

## GitHub Secrets 설정

GitHub 리포지토리의 Settings > Secrets에서 필요한 시크릿을 설정합니다:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- AWS_USER
- EC2_SSH_KEY
- EC2_INSTANCE
  ...다른 필요한 환경 변수들

---

아래는 다양한 AMI에 대한 기본 사용자 이름 목록입니다:

- Amazon Linux 2: ec2-user
- Ubuntu: ubuntu
- Debian: admin
- CentOS: centos
- RHEL: ec2-user 또는 root
- Fedora: fedora

template을 추가하려면 아래와 같이 진행해주세요.

```
# template repository 가져오기
git init
git remote add upstream https://github.com/devtor-who/to-the-next.git
git fetch upstream

# 기본 템플릿
git switch main

# ec2 template 사용하기
git merge upstream/template/aws-ec2 --allow-unrelated-histories

# cloudflare template 사용하기
git merge upstream/template/cloudflare --allow-unrelated-histories

# 내 원격 저장소에 연결하기
git remote add origin <GITHUB_REPOSITORY>
git push origin main

# upstream 삭제하기
git remote rm upstream
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
