from PIL import Image

im = Image.open('images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg')
w, h = im.size # 3024 x 4032

# In 460 x 560 container:
# Container aspect ratio = 460 / 560 = 0.8214
# Photo aspect ratio = 3024 / 4032 = 0.7500
# To cover: scale = 460 / 3024 = 0.1521
# scaled height = 4032 * 0.1521 = 613.3px
# Since container height is 560px:
# Height crop is 613.3 - 560 = 53.3px (only 8.7% of height!)
# And width crop is 0.0px (0%!)
# What does that mean?
# It means 100% OF THE WIDTH IS VISIBLE!
# The Thar vehicle on the left is 100% visible!
# Vijay Mathiew on the right is 100% visible!
# And the photo fills 100% of the box with ZERO empty space!

print("Container 460x560:")
print(f"Vijay: 100% width visible. Height crop: {53.3/613.3*100:.1f}%")

# Jayavignesh:
im2 = Image.open('images/jayavignesh.jpg')
w2, h2 = im2.size # 1600 x 2001
# ratio = 0.7996
# in 460x560:
# scale = 460 / 1600 = 0.2875
# scaled height = 2001 * 0.2875 = 575.3px
# Height crop = 575.3 - 560 = 15.3px (only 2.6% of height!)
# Width crop = 0px!
print(f"Jayavignesh: 100% width visible. Height crop: {15.3/575.3*100:.1f}%")
