import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'<section[^>]*id=["\']mentors["\'].*?</section>', html, re.DOTALL)
if m:
    print(m.group(0))

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

mentor_css = re.findall(r'(\.mentor[^{]*\{[^}]*\})', css)
print("\n=== MENTOR CSS ===")
for mc in mentor_css:
    print(mc)
