
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault(); // 기본 폼 제출 방지
    document.getElementById("message").textContent = "Submitting..";
    document.getElementById("message").style.display = "block";
    document.getElementById("submit-button").disabled = true;
    
    var popup = document.createElement("div");
    popup.textContent = "제출완료";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "WHITE";
    popup.style.color = "Black";
    popup.style.padding = "15px 30px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
    popup.style.fontSize = "18px";
    popup.style.fontWeight = "bold";
    popup.style.opacity = "0"; // 시작 시 투명
    popup.style.transition = "opacity 0.8s ease, transform 0.8s ease"; // 부드러운 전환
    popup.style.zIndex = "1000";
    
    document.body.appendChild(popup);
    
    setTimeout(function() {
    popup.style.opacity = "1";
    popup.style.transform = "translate(-50%, -50%) scale(2.15)";
    }, 10); // 시각적 효과
    
    setTimeout(function() {
    popup.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
    setTimeout(function() {
    document.body.removeChild(popup);
    }, 400); // 페이드 아웃 완료 후 제거
    }, 2000);
    
    // 폼 데이터 수집
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
    }
    var formDataString = keyValuePairs.join("&");
    
    fetch("https://script.google.com/macros/s/AKfycbyGxmwHUPxX2hk1BFkbjf28jKYGuHtbmr0B6akB_-o5Y5QxRq_ONU9dpFQZQyh4ItmO/exec", {
    redirect: "follow",
    method: "POST",
    body: formDataString,
    headers: {
    "Content-Type": "text/plain;charset=utf-8",
    },
    }).then(function(response) {
    if (response) {
    return response; // 정상적인 응답 처리
    } else {
    throw new Error("Failed to submit the form.");
    }
    }).then(function(data) {
    // 폼 초기화
    document.getElementById("submit-button").disabled = false;
    document.getElementById("form").reset();
    document.getElementById("additional-info").style.display = "none"; // 추가 입력 필드 숨김
    document.getElementById("noOption").checked = true; // '아니오' 기본값으로 재설정
    
    // 'Submitting..' 메시지 숨김
    document.getElementById("message").style.display = "none";
    
    }).catch(function(error) {
    console.error(error);
    document.getElementById("message").textContent = "An error occurred while submitting the form.";
    document.getElementById("message").style.display = "block";
    });
    });
    
    function deleteCookies() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    console.log(`Deleted cookie: ${name}`);
    }
    }
    

    // 팝업 닫기 함수
    function closePopup(popupId) {
        document.getElementById(popupId).style.display = 'none';
    }

    // 팝업 관련 이벤트 리스너 설정
    var termsLink = document.getElementById("termsLink");
    var marketingLink = document.getElementById("marketingLink");

    termsLink.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById('popup_terms').style.display = 'block';
    });

    marketingLink.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById('popup_marketing').style.display = 'flex'; // 텍스트 클릭 시 팝업 표시
    });

    document.querySelectorAll(".popup-close").forEach(function(closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            closePopup(this.closest('.popup-wrap').id);
        });
    });

    document.querySelectorAll(".popup-overlay").forEach(function(overlay) {
        overlay.addEventListener('click', function() {
            closePopup(this.closest('.popup-wrap').id);
        });
    });

    function toggleCheckbox(groupName, clickedCheckbox) {
        // 모든 체크박스 선택
        const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    
        // 클릭된 체크박스만 선택하도록 설정
        checkboxes.forEach(checkbox => {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
    
    // DOMContentLoaded 이벤트 리스너를 통해 페이지 로드 후 초기화
    document.addEventListener('DOMContentLoaded', () => {
        // 모든 체크박스에 toggleCheckbox 함수를 적용
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                toggleCheckbox(this.name, this);
            });
        });
    });

    popup.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // 모바일에서 부드러운 전환
