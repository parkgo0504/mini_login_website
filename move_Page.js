
/*
*최초작성자 :박기원
*최초작성일 :2023.07.27
*최종변경일 :2023.07.27
*목적 : html 페이지 이동 js 
*개정이력 : 
*/







// 페이지 이동 함수
function movePage() {
  // 이동할 페이지의 URL
  const targetURL = "login_copy.html";
  
  // 현재 창의 URL을 변경하여 새로운 페이지로 이동합니다.
  window.location.href = targetURL;
}