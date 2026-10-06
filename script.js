"use strict";
const get = (id) => document.getElementById(id);
let kind = "button", tab = "html";
const templates = {
    button: (v) => `<button class="nova ${v.toLowerCase()}">${v} action</button>`,
    input: () => `<label class="nova-field">Email address<input type="email" placeholder="you@example.com"><small>We will never share your email.</small></label>`,
    card: () => `<article class="nova-card"><span>NEW RELEASE</span><h3>Build a focused interface</h3><p>Composable structure with a small, consistent visual language.</p><button class="nova primary">Explore</button></article>`,
    alert: (v) => `<div class="nova-alert"><b>${v} notice</b><p>Your changes have been saved successfully.</p></div>`,
    badge: (v) => `<div class="badge-row"><span class="nova-badge">${v}</span><span class="nova-badge">TypeScript</span><span class="nova-badge">Accessible</span></div>`,
    toggle: () => `<label style="display:flex;align-items:center;gap:12px;padding:18px;color:#fff"><input type="checkbox" checked style="accent-color:${accent.value};width:22px;height:22px"> Enable notifications</label>`,
    progress: () => `<div role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" style="width:min(420px,100%);color:#fff"><div style="height:12px;border-radius:20px;background:#262436;overflow:hidden"><i style="display:block;width:68%;height:100%;background:${accent.value}"></i></div><b style="display:block;margin-top:12px">68% complete</b></div>`,
    avatar: () => `<div style="display:flex"><span style="display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:${accent.value};color:white;border:3px solid #111">SM</span><span style="display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#25304d;color:white;border:3px solid #111;margin-left:-10px">AK</span><span style="display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#181824;color:white;border:3px solid #111;margin-left:-10px">+4</span></div>`,
    table: () => `<div style="width:min(500px,100%);color:#fff;border:1px solid ${accent.value}55;border-radius:${radius.value}px;overflow:hidden"><div style="display:grid;grid-template-columns:1fr 1fr;padding:14px;background:${accent.value}22"><b>Project</b><b>Status</b></div><div style="display:grid;grid-template-columns:1fr 1fr;padding:14px;border-top:1px solid #ffffff18"><span>Dashboard</span><em>Ready</em></div><div style="display:grid;grid-template-columns:1fr 1fr;padding:14px;border-top:1px solid #ffffff18"><span>API layer</span><em>Review</em></div></div>`,
};
const accent = get("accent"), radius = get("radius"), density = get("density"), variant = get("variant"), preview = get("preview"), code = get("code");
function css() {
    const danger = variant.value === "Danger" ? "#ef355f" : accent.value;
    return `.nova {\n  --accent: ${danger};\n  border-radius: ${radius.value}px;\n  padding: ${density.value};\n}\n.nova.primary {\n  color: white;\n  background: var(--accent);\n  border: 1px solid var(--accent);\n}\n.nova:focus-visible {\n  outline: 3px solid color-mix(in srgb, var(--accent) 35%, transparent);\n  outline-offset: 3px;\n}`;
}
function render() {
    const html = templates[kind](variant.value);
    preview.innerHTML = `<style>${css()} .nova{font:600 15px Inter,system-ui;cursor:pointer}.outline{color:${accent.value};background:transparent;border:1px solid ${accent.value}}.ghost{color:${accent.value};background:${accent.value}18;border:1px solid transparent}.danger{color:#fff;background:#ef355f;border:0}.nova-field{display:grid;gap:8px;width:min(340px,100%);color:#d8d4e4}.nova-field input{padding:${density.value};border-radius:${radius.value}px;border:1px solid ${accent.value}66;background:#0b0b14;color:#fff}.nova-field small{color:#8e889e}.nova-card{width:min(360px,100%);padding:25px;border:1px solid ${accent.value}55;border-radius:${radius.value}px;background:#10101d;color:#fff;box-shadow:0 20px 70px ${accent.value}20}.nova-card span,.nova-alert b{color:${accent.value};font-size:10px;letter-spacing:.13em}.nova-card p,.nova-alert p{color:#aaa5b7;line-height:1.6}.nova-alert{width:min(430px,100%);padding:20px;border-left:4px solid ${accent.value};border-radius:${radius.value}px;background:${accent.value}15}.badge-row{display:flex;gap:8px;flex-wrap:wrap}.nova-badge{padding:${density.value};border:1px solid ${accent.value}66;border-radius:${radius.value}px;color:${accent.value};background:${accent.value}12}</style>${html}`;
    code.textContent = tab === "html" ? html : css();
    get("radiusOut").textContent = radius.value + "px";
}
document.querySelectorAll("[data-kind]").forEach((b) => (b.onclick = () => {
    kind = b.dataset.kind;
    document
        .querySelectorAll("[data-kind]")
        .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    render();
}));
document.querySelectorAll("[data-size]").forEach((b) => (b.onclick = () => {
    preview.style.width = b.dataset.size || "100%";
    document
        .querySelectorAll("[data-size]")
        .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
}));
document.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => {
    tab = b.dataset.tab;
    document
        .querySelectorAll("[data-tab]")
        .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    render();
}));
[accent, radius, density, variant].forEach((x) => (x.oninput = render));
get("copy").onclick = async (e) => {
    await navigator.clipboard.writeText(code.textContent || "");
    e.currentTarget.textContent = "Copied ✓";
    setTimeout(() => (get("copy").textContent = "Copy code"), 1200);
};
render();
