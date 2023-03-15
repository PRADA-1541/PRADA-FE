# Git & Git Flow

## Git Flow

1. 브랜치 생성하기
```
git branch <브랜치 이름>
```
```
init      Initialize a new git repo with support for the branching model.
feature   Manage your feature branches.
bugfix    Manage your bugfix branches.
release   Manage your release branches.
hotfix    Manage your hotfix branches.
support   Manage your support branches.
version   Shows version information.
config    Manage your git-flow configuration.
log       Show log deviating from base branch.
```
```
  ex) 헤더 기능을 구현하는 브랜치일 경우 feature/Header
```
  
2. 브랜치로 이동
```
  git checkout <브랜치 이름>
```
  
3. 로컬 브랜치를 GitHub로 push
```
  git push origin <브랜치 이름>
```
- push 하기 전에 반드시 develop 브랜치를 pull 하고 conflict 해결 후 push하기
```
  git pull origin develop
```
  
4. GitHub에서 Pull Request
- Reviewer 적용
- develop 브랜치로 merge 요청하는 것이 맞는지 확인 필수

# Commit Message Convention

1. feat: 새로운 기능 추가<br>
2. fix: 버그 수정<br>
3. docs: 문서 수정<br>
4. update: 라이브러리, 이미지 등을 추가<br>
5. style: css, 코드 포맷 등의 수정<br>
6. refactor: 코드 리팩토링<br>
7. test: 테스트 코드 추가, 수정, 삭제<br>
8. rename: 파일명 변경<br>
