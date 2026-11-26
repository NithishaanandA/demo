from PIL import Image

im = Image.open('images/posts/vm_wild_expeditions/Carousels/DdNtnOUj7gU/instabulkdownloader.com_DdNtnOUj7gU_02.jpg')
w, h = im.size
print(f"Jawai width={w}, height={h}")
# Let's save a crop of top half and center
crop = im.crop((0, 0, w, int(h * 0.7)))
crop.save('scratch/crop_jawai.jpg')
print("Saved Jawai crop.")
