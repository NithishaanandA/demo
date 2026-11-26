from PIL import Image

# Check Vijay Mathiew photo
im1 = Image.open('images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg')
w1, h1 = im1.size

# Check Jayavignesh photo
im2 = Image.open('images/jayavignesh.jpg')
w2, h2 = im2.size

print(f"Vijay: {w1}x{h1}, ratio={w1/h1:.3f}")
print(f"Jayavignesh: {w2}x{h2}, ratio={w2/h2:.3f}")

# If container is 480 wide by 620 high:
# Ratio = 480 / 620 = 0.774
# Vijay ratio = 0.750 -> scaling to fill 480x620:
scale_w = 480 / w1
scale_h = 620 / h1
scale = max(scale_w, scale_h)
new_w, new_h = w1 * scale, h1 * scale
print(f"Vijay in 480x620: scaled to {new_w:.1f}x{new_h:.1f}")
print(f"Width crop: {new_w - 480:.1f}px (0%), Height crop: {new_h - 620:.1f}px ({((new_h - 620)/new_h)*100:.1f}%)")

# Jayavignesh in 480x620:
scale_w2 = 480 / w2
scale_h2 = 620 / h2
scale2 = max(scale_w2, scale_h2)
new_w2, new_h2 = w2 * scale2, h2 * scale2
print(f"Jayavignesh in 480x620: scaled to {new_w2:.1f}x{new_h2:.1f}")
print(f"Width crop: {new_w2 - 480:.1f}px, Height crop: {new_h2 - 620:.1f}px ({((new_h2 - 620)/new_h2)*100:.1f}%)")
