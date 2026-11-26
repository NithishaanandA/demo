import os, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

print("--- 1. Checking for TECHNICAL FIELD DATA or gear strings ---")
for name, content in [('index.html', html), ('css/style.css', css), ('js/main.js', js)]:
    matches = re.findall(r'(TECHNICAL FIELD DATA|600mm|data-gear|gallery-gear|lightbox-gear)', content, re.IGNORECASE)
    print(f"{name}: {len(matches)} matches {matches}")

print("\n--- 2. Checking image sources in index.html ---")
img_srcs = re.findall(r'<img[^>]+src="([^">]+)"', html)
print(f"Total img tags in index.html: {len(img_srcs)}")

missing = []
for src in img_srcs:
    clean_src = src.split('?')[0].split('#')[0]
    if not os.path.exists(clean_src):
        missing.append(clean_src)

print(f"Missing images: {len(missing)} {missing}")

from collections import Counter
counts = Counter(img_srcs)
duplicates = {k: v for k, v in counts.items() if v > 1}
print(f"Duplicate images: {len(duplicates)} {duplicates}")

print("\n--- 3. Verifying Mentor CSS styling ---")
mentor_photo_match = re.search(r'\.mentor-photo\s*\{([^}]+)\}', css)
if mentor_photo_match:
    print(".mentor-photo rules:\n", mentor_photo_match.group(1).strip())

mentor_container_match = re.search(r'\.mentor-image-container\s*\{([^}]+)\}', css)
if mentor_container_match:
    print("\n.mentor-image-container rules:\n", mentor_container_match.group(1).strip())

print("\n--- 4. Verifying Expedition Card CSS styling ---")
exp_feat_match = re.search(r'\.expedition-feature \.expedition-card-image\s*\{([^}]+)\}', css)
if exp_feat_match:
    print(".expedition-feature .expedition-card-image:\n", exp_feat_match.group(1).strip())

exp_side_match = re.search(r'\.expedition-side-card \.expedition-card-image\s*\{([^}]+)\}', css)
if exp_side_match:
    print("\n.expedition-side-card .expedition-card-image:\n", exp_side_match.group(1).strip())
