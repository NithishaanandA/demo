from PIL import Image

im = Image.open('images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg')
w, h = im.size
print("Vijay photo size:", w, h)

# Let's see thumbnail dimensions
thumb = im.copy()
thumb.thumbnail((400, 533))
thumb.save('scratch/vijay_full_preview.jpg')

im2 = Image.open('images/jayavignesh.jpg')
thumb2 = im2.copy()
thumb2.thumbnail((400, 500))
thumb2.save('scratch/jaya_full_preview.jpg')
print("Saved previews.")
