with open('css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if '.mentor-card' in line or '.mentor-photo' in line or '.expedition-feature' in line:
        print(f"L{idx+1}: {line.strip()}")
