from PIL import Image

def inspect_img(name, path):
    im = Image.open(path)
    w, h = im.size
    print(f"\n=== {name} ({w}x{h}) ===")
    # Let's save a thumbnail or check brightness/features if needed
    print(f"Aspect ratio: {w/h:.3f}")

inspect_img("Tadoba (1.jpg)", "images/tours/Animals/Tadoba/1.jpg")
inspect_img("Pench Leopard", "images/animals/pench_leopard.jpg")
inspect_img("Jawai Leopard", "images/posts/vm_wild_expeditions/Carousels/DdNtnOUj7gU/instabulkdownloader.com_DdNtnOUj7gU_02.jpg")
inspect_img("Vijay Mathiew Mentor", "images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg")
inspect_img("Jayavignesh Mentor", "images/jayavignesh.jpg")
