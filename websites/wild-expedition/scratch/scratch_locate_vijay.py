from PIL import Image

im = Image.open('images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg')
w, h = im.size
print(f"Vijay image size: {w}x{h}")

# In the image, where is Vijay?
# Let's crop different horizontal regions and check where Vijay's face/body is
# Width is 3024, Height is 4032.
# Vijay is on the right side: roughly x from 1800 to 2900, y from 1200 to 3900.
# Head is roughly at x: 2100-2600, y: 1200-1700.
