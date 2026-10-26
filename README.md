# 이하은 · 클라우드 엔지니어 포트폴리오

GitHub Pages로 배포하는 정적 포트폴리오 사이트입니다. 빌드 도구 없이 HTML/CSS만 사용합니다.

## 폴더 구조

```
.
├── index.html            # 배너 + 탭(About Me / Project / Contact) + 프로젝트 상세 모달
├── .nojekyll             # Jekyll 처리 끄기
└── assets/
    ├── css/style.css
    ├── js/main.js        # 탭 전환, 모달 열기/닫기, 배너 터미널 타이핑
    └── img/              # 프로젝트 이미지
```

## 배포 방법

1. GitHub에서 새 저장소 생성
   - 이름을 `<GitHub 아이디>.github.io` 로 하면 주소가 `https://<아이디>.github.io` 가 됩니다.
   - 다른 이름(예: `portfolio`)이면 `https://<아이디>.github.io/portfolio` 가 됩니다.
2. 이 폴더 내용을 저장소 루트에 올리기

   ```bash
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/<아이디>/<저장소이름>.git
   git push -u origin main
   ```

3. 저장소 **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/(root)** → Save
4. 1~2분 뒤 표시되는 주소로 접속해 확인

## 올리기 전에 바꿀 것 (`index.html`에서 `TODO` 검색)

- [ ] Contact 탭: 이메일 `your.email@example.com`, GitHub `YOUR_GITHUB_ID`
- [ ] Contact 탭 PDF 링크: 포트폴리오 PDF를 `assets/portfolio.pdf` 로 넣거나 해당 줄 삭제
- [ ] (선택) WAF 적용 전/후 캡처를 `assets/img/waf-before.png`, `waf-after.png` 로 넣고 주석 해제

탭은 주소로 바로 열 수 있습니다: `.../#project`, `.../#contact`

## 공개 전 확인

- 공개 저장소의 Pages는 누구나 볼 수 있습니다. 실습 중 캡처에 **IP, 계정 ID, 도메인, 토큰**이 보이지 않는지 확인하세요.
- 팀 프로젝트 화면·자료를 올릴 때는 팀원 동의를 받아 두는 것이 좋습니다.

## PetClinic 섹션 추가 (실습 완료 후)

1. Project 탭 `main-cards` 안에 카드(`<button class="pcard" data-open="m-pc">`)를 하나 더 추가
2. 파일 아래쪽 모달 영역에 `<dialog class="detail" id="m-pc">` 를 EKS 모달을 복사해 만들기
3. About 탭 Skills의 Kubernetes 막대를 `level l1 → l2` 로 변경
