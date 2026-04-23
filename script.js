const VALID_CODE = "0320/6341/2026.bü.";
const DEBUG_CODE = "1";
const EVIDENCE_PASS = "185.203.119.42";

function processLogin() {
    const input = document.getElementById('access-code');
    const msg = document.getElementById('status-msg');
    const container = document.getElementById('main-container');

    if (input.value.trim() === VALID_CODE || input.value.trim() === DEBUG_CODE) {
        msg.innerText = "AZONOSÍTÁS SIKERES...";
        msg.style.color = "var(--success-green)";
        input.style.borderColor = "var(--success-green)";
        
        setTimeout(() => {
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('loading-screen').classList.remove('hidden');
            document.getElementById('loading-screen').style.display = 'flex';
            
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('evidence-section').classList.remove('hidden');
            }, 2600);
        }, 800);
    } else {
        msg.innerText = "HOZZÁFÉRÉS MEGTAGADVA!";
        msg.style.color = "var(--error-red)";
        container.classList.add('error-shake');
        setTimeout(() => container.classList.remove('error-shake'), 500);
    }
}

function toggleDetails() {
    const details = document.getElementById('personal-data');
    details.style.display = (details.style.display === 'block') ? 'none' : 'block';
}

function toggleDigitalFiles() {
    const gallery = document.getElementById('digital-gallery');
    gallery.style.display = (gallery.style.display === 'block') ? 'none' : 'block';
}

// Új funkció a jelszókérő megjelenítéséhez
function showAuthChat() {
    const authBox = document.getElementById('auth-chat');
    authBox.classList.remove('hidden');
    authBox.scrollIntoView({ behavior: 'smooth' });
}

// Jelszó ellenőrzése
// ... (a korábbi változók változatlanok) ...

function checkEvidencePassword() {
    const passInput = document.getElementById('evidence-pass');
    const authBox = document.getElementById('auth-chat');
    const authMsg = document.getElementById('auth-msg');
    const dashboard = document.getElementById('main-container');
    const secretGallery = document.getElementById('secret-gallery');
    const lockedBtn = document.getElementById('locked-files');

    if (passInput.value === EVIDENCE_PASS) {
        // SIKERES JELSZÓ
        authMsg.innerText = "HOZZÁFÉRÉS ENGEDÉLYEZVE. DEKÓDOLÁS...";
        authMsg.style.color = "var(--success-green)";
        authBox.style.borderColor = "var(--success-green)";
        
        setTimeout(() => {
            // Jelszókérő elrejtése
            authBox.classList.add('hidden');
            // Új galéria megjelenítése
            secretGallery.classList.remove('hidden');
            // A "További bizonyítékok" gomb elrejtése, mert már feloldottuk
            lockedBtn.classList.add('hidden');
            
            // Görgetés az új képekhez
            secretGallery.scrollIntoView({ behavior: 'smooth' });
        }, 1500);

    } else {
        // ROSSZ JELSZÓ
        authMsg.innerText = "HIBÁS BIZTONSÁGI KULCS!";
        authMsg.style.color = "var(--error-red)";
        authBox.classList.add('error-shake');
        dashboard.classList.add('error-shake');
        
        setTimeout(() => {
            authBox.classList.remove('error-shake');
            dashboard.classList.remove('error-shake');
        }, 500);
    }
}

// ... (a többi függvény változatlan) ...
// Az eredeti accessDenied funkciót meghagytam, ha másra kellene, 
// de a gomb már a showAuthChat-et hívja.
function accessDenied() {
    const chatBox = document.getElementById('system-chat');
    const chatMsg = document.getElementById('chat-message');

    chatBox.classList.remove('hidden');
    chatMsg.innerText = "RENDSZERÜZENET: Jogosultság megtagadva! (Err. #0012)";
    chatMsg.style.color = "var(--error-red)";

    setTimeout(() => {
        chatBox.classList.add('hidden');
    }, 5000);
}