from PIL import Image

im = Image.open('images/tours/Animals/Tadoba/1.jpg')
w, h = im.size
print(f"Tadoba 1.jpg: {w}x{h}")
# Let's see what happens with different object-position values
# If .expedition-feature has container width ~ 55% of the card, and height ~ 480px.
# In the screenshot media_1795650655700_1c1ece20.jpg:
# The tiger's left eye and left ear are visible, but the right half of the tiger's face (her right eye and right whisker) are cut off by the right edge!
# Because the tiger is located towards the center-right of the original image!
# Let's find where the tiger is in 1.jpg:
