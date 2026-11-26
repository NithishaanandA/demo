import re, os
from PIL import Image

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

exp_start = content.find('id="expeditions"')
exp_end = content.find('id="gallery"')
exp_section = content[exp_start:exp_end]

cards = re.findall(r'<article class="(expedition-[^"]+)"[^>]*>.*?<img class="expedition-card-image" src="([^"]+)".*?<h3>([^<]+)</h3>', exp_section, re.DOTALL)

for i, (card_cls, img_src, title) in enumerate(cards, 1):
    exists = os.path.exists(img_src)
    size_str = "NOT FOUND"
    if exists:
        im = Image.open(img_src)
        size_str = f"{im.size} (aspect: {im.size[0]/im.size[1]:.2f})"
    print(f"Card {i} [{card_cls}]: {title.strip()} -> {img_src} | {size_str}")

# Check Mentors
mentor_start = content.find('id="mentors"')
mentor_end = content.find('id="experience"') if content.find('id="experience"') != -1 else len(content)
mentor_section = content[mentor_start:mentor_end]

mentors = re.findall(r'<article class="mentor-card[^"]*"[^>]*>.*?<img class="mentor-photo" src="([^"]+)".*?<h3>([^<]+)</h3>', mentor_section, re.DOTALL)
for i, (img_src, name) in enumerate(mentors, 1):
    exists = os.path.exists(img_src)
    size_str = "NOT FOUND"
    if exists:
        im = Image.open(img_src)
        size_str = f"{im.size} (aspect: {im.size[0]/im.size[1]:.2f})"
    print(f"Mentor {i}: {name.strip()} -> {img_src} | {size_str}")
