with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re

# Check gallery-gear in gallery
gal_gear = re.findall(r'<span class="gallery-gear">.*?</span>', html)
print(f"gallery-gear spans found in index.html: {len(gal_gear)}")

# Check data-gear
data_gear = re.findall(r'data-gear="[^"]*"', html)
print(f"data-gear attributes found in index.html: {len(data_gear)}")

# Check lightbox-gear-box
lb_box = re.findall(r'<div class="lightbox-gear-box">.*?</div>', html, re.DOTALL)
print(f"lightbox-gear-box found in index.html: {len(lb_box)}")

# Check review-gear
rev_gear = re.findall(r'<span class="review-gear">.*?</span>', html)
print(f"review-gear spans found in index.html: {len(rev_gear)}")
