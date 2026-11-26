from PIL import Image

im = Image.open('C:/Users/ELCOT/.gemini/antigravity/brain/f10bc687-b046-4001-9f65-48a986788228/.user_uploaded/media_1795652998234_3be343ad.jpg').convert('RGBA')

# 1. Transparent PNG: Knock out pure white to transparent
datas = im.getdata()
new_data = []
for item in datas:
    # item is (r, g, b, a)
    # If pixel is close to pure white (> 240, 240, 240), make transparent
    brightness = (item[0] + item[1] + item[2]) / 3
    if brightness > 245:
        new_data.append((item[0], item[1], item[2], 0))
    elif brightness > 220:
        # smooth anti-aliased edge
        alpha = int((245 - brightness) / 25 * 255)
        new_data.append((item[0], item[1], item[2], alpha))
    else:
        new_data.append(item)

im_trans = Image.new('RGBA', im.size)
im_trans.putdata(new_data)
im_trans.save('images/places/tamilnadu_elephant_trans.png', 'PNG')
print("Saved transparent PNG.")

# 2. Dark theme version: placed on forest dark card background (#141c16 = 20, 28, 22)
# Invert grayscale so the dark elephant and dark map become luminous silver/white on dark background
im_gray = Image.open('C:/Users/ELCOT/.gemini/antigravity/brain/f10bc687-b046-4001-9f65-48a986788228/.user_uploaded/media_1795652998234_3be343ad.jpg').convert('L')
from PIL import ImageOps
im_inv = ImageOps.invert(im_gray)
# Tint with gold/silver
im_dark = Image.new('RGB', im.size, (14, 20, 15))
# Blend
im_inv.save('images/places/tamilnadu_elephant_inverted.jpg')
print("Saved inverted preview.")
