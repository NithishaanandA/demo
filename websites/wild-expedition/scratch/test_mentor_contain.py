from PIL import Image

im = Image.open('images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg')
w, h = im.size
print(f"Original size: {w}x{h}")

# The image is 3024x4032.
# Vijay is standing on the right side of the jeep.
# Let's inspect what happens when object-fit: contain is used.
# If container is say 380px wide and 550px high:
# The image fits inside with width 380 and height 380 * 4032 / 3024 = 506px!
# That means it uses almost the full height!
