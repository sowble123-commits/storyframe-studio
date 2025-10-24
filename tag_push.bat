@echo off
chcp 65001 >nul

:: 🏷 버전 이름 입력받기
set /p TAGNAME=버전(태그) 이름을 입력하세요: 

echo ===========================================
echo  [ StoryFrame Git Push Script ]
echo  태그 이름: %TAGNAME%
echo ===========================================

:: 1. 변경사항 스테이징
git add .

:: 2. 커밋 생성
git commit -m "%TAGNAME%"

:: 3. 태그 생성
git tag %TAGNAME%

:: 4. 브랜치 푸시
git push -u origin main

:: 5. 태그 푸시
git push origin %TAGNAME%

echo -------------------------------------------
echo ✅ 태그 [%TAGNAME%] 푸시 완료!
pause
