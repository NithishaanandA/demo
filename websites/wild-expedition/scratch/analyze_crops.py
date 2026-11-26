from PIL import Image

def analyze(name, path):
    im = Image.open(path)
    w, h = im.size
    print(f"\n{name} ({path}): size={w}x{h}")
    # Let's save a 500px wide version so we can see
    thumb = im.copy()
    thumb.thumbnail((600, 600))
    thumb.save(f"scratch/{name}.jpg")

analyze("tadoba_maya", "images/tours/Animals/Tadoba/1.jpg")
analyze("pench_leopard", "images/animals/pench_leopard.jpg")
analyze("jawai_leopard", "images/posts/vm_wild_expeditions/Carousels/DdNtnOUj7gU/instabulkdownloader.com_DdNtnOUj7gU_02.jpg")
