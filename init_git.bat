@echo off
chcp 65001 >nul
title NeoSystem GitHub Init
echo ===============================
echo [NeoSystem GitHub 초기 설정]
echo ===============================

REM 깃 초기화
git init

REM 기본 브랜치 이름을 main으로 설정
git branch -M main

REM 깃허브 저장소 연결 (👉 여기에 본인 저장소 주소 입력)
set /p REPO_URL=GitHub 저장소 URL 입력: 
git remote add origin %REPO_URL%

REM .gitignore 파일 생성
echo .env>> .gitignore
echo NeoSystem_Backups/>> .gitignore
echo __pycache__/>> .gitignore
echo *.log>> .gitignore

REM 예시용 .env 템플릿 생성
echo OPENAI_API_KEY=>> .env.example

REM 초기 커밋
git add .
git commit -m "Initial NeoSystem structure"
git push -u origin main

echo ===============================
echo [완료] 깃허브 초기 설정 완료!
echo 저장소: %REPO_URL%
pause
