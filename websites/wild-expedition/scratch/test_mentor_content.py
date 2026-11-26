# Let's inspect the exact content of both mentor cards
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

m1_start = html.find('<!-- Mentor 1: Vijay Mathiew -->')
m2_start = html.find('<!-- Mentor 2: Jayavignesh Hariharan -->')
m_end = html.find('</section>', m2_start)

m1_html = html[m1_start:m2_start]
m2_html = html[m2_start:m_end]

print("Mentor 1 length:", len(m1_html))
print("Mentor 2 length:", len(m2_html))
