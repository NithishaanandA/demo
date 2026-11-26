from PIL import Image

im = Image.open('images/tours/Animals/Tadoba/1.jpg')
w, h = im.size
print(f"Tadoba width={w}, height={h}")

# If we crop the right side: 50% to 100% of width
# where is the tiger's face?
# Let's save a crop with x from 0.35 to 0.85
crop_tiger = im.crop((int(w * 0.3), 0, int(w * 0.9), h))
crop_tiger.save('scratch/crop_tiger.jpg')

# Pench leopard:
im_p = Image.open('images/animals/pench_leopard.jpg')
wp, hp = im_p.size
print(f"Pench width={wp}, height={hp}")
# The leopard in pench_leopard.jpg:
# In the user screenshot, only the rocks and the leopard's tail/paws are visible, the head is cropped off!
# That means the leopard's head is in the TOP 30% of the image!
# Let's check:
crop_top = im_p.crop((0, 0, wp, int(hp * 0.6)))
crop_top.save('scratch/crop_pench_top.jpg')
print("Saved crops.")
