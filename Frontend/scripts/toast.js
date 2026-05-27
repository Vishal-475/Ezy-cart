export function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.pointerEvents = 'auto';
    
    let bgColor = 'rgba(66, 184, 62, 0.95)'; // success
    let icon = '✔';
    if (type === 'error') {
        bgColor = 'rgba(231, 76, 60, 0.95)';
        icon = '✖';
    } else if (type === 'info') {
        bgColor = 'rgba(52, 152, 219, 0.95)';
        icon = 'ℹ';
    } else if (type === 'warning') {
        bgColor = 'rgba(241, 196, 15, 0.95)';
        icon = '⚠';
    }
    
    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 14px 22px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        backdrop-filter: blur(5px);
        opacity: 0;
        transform: translateX(100px) scale(0.9);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        min-width: 280px;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-left: 5px solid rgba(255,255,255,0.4);
    `;
    
    toast.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:1.1rem; font-weight:bold;">${icon}</span>
            <span>${message}</span>
        </div>
        <button style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer; margin-left:15px; padding:0; line-height:1; opacity:0.7; transition:opacity 0.2s;">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // hover opacity transition
    const closeBtn = toast.querySelector('button');
    closeBtn.onmouseenter = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseleave = () => closeBtn.style.opacity = '0.7';

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0) scale(1)';
    }, 20);
    
    toast.onclick = (e) => {
        if (e.target === closeBtn) {
            dismissToast(toast);
        }
    };
    
    const timeoutId = setTimeout(() => dismissToast(toast), 3500);
    
    function dismissToast(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateX(100px) scale(0.9)';
        setTimeout(() => el.remove(), 400);
        clearTimeout(timeoutId);
    }
}

window.showToast = showToast;
