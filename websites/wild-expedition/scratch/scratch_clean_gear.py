import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove gallery-gear spans
html_clean = re.sub(r'\s*<span class="gallery-gear">.*?</span>', '', html)

# Remove data-gear attributes
html_clean = re.sub(r'\s*data-gear="[^"]*"', '', html_clean)

# Remove lightbox-gear-box
html_clean = re.sub(r'\s*<div class="lightbox-gear-box">.*?</div>', '', html_clean, flags=re.DOTALL)

# Remove review-gear
html_clean = re.sub(r'\s*<span class="review-gear">.*?</span>', '', html_clean)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_clean)

print("Updated index.html: Removed all technical gear data elements.")

# 2. Update js/main.js
with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove modalGear reference
js = re.sub(r'const modalGear = document\.querySelector\("#lightbox-gear"\);\s*', '', js)
js = re.sub(r'const gear = item\.dataset\.gear \|\| "";\s*', '', js)
js = re.sub(r'if \(modalGear\) modalGear\.textContent = gear;\s*', '', js)

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated js/main.js: Cleaned up modalGear logic.")
