BRANCH=$(git rev-parse --abbrev-ref HEAD)
LOG_FILE="conflict_list_log.txt"

echo "현재 브랜치: $BRANCH"
echo "원격 변경사항 가져오는 중..."
git fetch origin || { echo "❌ fetch 실패"; exit 1; }

echo "병합 시도 중..."
if git merge origin/$BRANCH; then
    echo "✅ 병합 성공! 이제 커밋하고 push 하면 됩니다."
else
    echo "❌ 충돌 발생! 수동으로 충돌 해결 필요"

    # 충돌 파일 목록 추출해서 저장
    git diff --name-only --diff-filter=U > "$LOG_FILE"

    echo "🔍 충돌 파일 목록이 $LOG_FILE 에 저장되었습니다:"
    cat "$LOG_FILE"

    echo -e "\033[33m\n충돌 해결 후 다음 명령어를 실행하세요:"
    echo "   git add ."
    echo "   git commit -m '충돌 해결'"
    echo -e "   git push origin $BRANCH\033[0m"

    exit 1
fi