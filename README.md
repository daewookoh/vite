# Vite + React + TypeScript + Vercel + Neon DB

이 프로젝트는 Vite, React, TypeScript를 사용하여 구축되었으며, Vercel에 배포되고 Neon PostgreSQL 데이터베이스와 연결됩니다.

## 기능

- 🔐 JWT 기반 인증 시스템
- 👤 사용자 로그인/로그아웃
- 📊 사용자 대시보드
- 🚀 Vercel 서버리스 함수
- 🗄️ Neon PostgreSQL 데이터베이스 연결

## 환경 설정

### 1. Neon 데이터베이스 설정

1. [Neon Console](https://console.neon.tech/)에서 새 프로젝트 생성
2. 데이터베이스 URL 복사
3. `schema.sql` 파일을 Neon SQL 에디터에서 실행하여 테이블 생성

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Neon Database Configuration
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Vercel Environment
VERCEL_ENV=development

# API Base URL
VITE_API_URL=/api
```

### 3. Vercel 배포

1. [Vercel](https://vercel.com/)에 계정 생성
2. GitHub 저장소 연결
3. 환경변수를 Vercel 대시보드에서 설정
4. 자동 배포 완료

## 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

## 테스트 계정

데이터베이스에 다음 테스트 계정이 생성됩니다:

- **사용자명**: admin, **비밀번호**: admin123
- **사용자명**: testuser, **비밀번호**: test123
- **사용자명**: demo, **비밀번호**: demo123

## API 엔드포인트

- `POST /api/auth` - 로그인
- `GET /api/users` - 사용자 목록 조회
- `POST /api/users` - 새 사용자 생성

## 프로젝트 구조

```
src/
├── components/
│   ├── LoginForm.tsx      # 로그인 폼
│   ├── LoginForm.css
│   ├── UserDashboard.tsx  # 사용자 대시보드
│   └── UserDashboard.css
├── services/
│   └── api.ts            # API 서비스
├── App.tsx               # 메인 앱 컴포넌트
└── main.tsx             # 앱 진입점

api/
├── auth.ts              # 인증 API
└── users.ts             # 사용자 API
```

## 배포 가이드

### Vercel 배포

1. GitHub에 코드 푸시
2. Vercel 대시보드에서 프로젝트 import
3. 환경변수 설정:
   - `DATABASE_URL`: Neon 데이터베이스 URL
   - `JWT_SECRET`: JWT 서명용 비밀키
4. 자동 배포 완료

### 환경변수 설정 (Vercel)

Vercel 대시보드의 Settings > Environment Variables에서 다음 변수들을 설정하세요:

- `DATABASE_URL`: Neon에서 제공하는 PostgreSQL 연결 문자열
- `JWT_SECRET`: 강력한 랜덤 문자열 (예: `openssl rand -base64 32`로 생성)

## 개발 가이드

### 로컬 개발

1. `.env.local` 파일 생성 및 환경변수 설정
2. `npm install`로 의존성 설치
3. `npm run dev`로 개발 서버 시작

### 데이터베이스 스키마

`schema.sql` 파일을 Neon SQL 에디터에서 실행하여 필요한 테이블과 샘플 데이터를 생성하세요.

## 문제 해결

### 일반적인 문제

1. **데이터베이스 연결 오류**: `DATABASE_URL`이 올바른지 확인
2. **CORS 오류**: Vercel 함수에서 CORS 헤더가 올바르게 설정되어 있는지 확인
3. **JWT 토큰 오류**: `JWT_SECRET`이 설정되어 있는지 확인

### 로그 확인

- Vercel 대시보드의 Functions 탭에서 서버리스 함수 로그 확인
- 브라우저 개발자 도구의 Network 탭에서 API 요청/응답 확인# vite
