# @dsds/create

DSDS 프로젝트의 템플릿 기반 생성 도구입니다. React/Vue 등 다양한 템플릿을 기반으로 신규 프로젝트를 빠르게 시작할 수 있습니다.

## 특징
- 템플릿(예: React, Vue) 기반 프로젝트 생성
- 디자인 시스템, 기본 폴더 구조, 설정 자동 적용
- 커스텀 템플릿 파일(`templates/`) 지원
- CLI 인터랙티브 프롬프트 제공

## 설치 및 실행

### pnpm (권장)
```sh
pnpm create @dsds <project-name> [--template=<template>]
```

### npx
```sh
npx @dsds/create <project-name> [--template=<template>]
```

## 옵션

- `--template=<template>`: 사용할 템플릿 지정 (예: `react-ts`, `vue-ts` 등)
  - `--template` 옵션이 생략될 경우 기본 템플릿은 **`react-ts`** 입니다.

## 개발 및 배포
- 빌드시 `dist/`에 CLI와 템플릿 파일이 함께 포함됩니다.
- 템플릿 파일은 `dist/templates/`에 복사되어 런타임에 사용됩니다.

## 예시
```sh
pnpm create @dsds my-app --template=react-ts
```

## 라이선스
MIT
