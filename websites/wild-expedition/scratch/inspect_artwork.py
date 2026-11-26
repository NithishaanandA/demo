from PIL import Image
import os

img_path = 'C:/Users/ELCOT/.gemini/antigravity/brain/f10bc687-b046-4001-9f65-48a986788228/.user_uploaded/media_1795652998234_3be343ad.jpg'
im = Image.open(img_path)

os.makedirs('images/places', exist_ok=True)
im.save('images/places/tamilnadu_elephant_artwork.jpg', quality=95)
print("Saved images/places/tamilnadu_elephant_artwork.jpg")

corner_pixel = im.getpixel((0, 0))
print("Corner pixel:", corner_pixel)
