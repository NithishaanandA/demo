from PIL import Image

def find_subject_center(path):
    im = Image.open(path)
    w, h = im.size
    print(f"File: {path} ({w}x{h})")

find_subject_center("images/tours/Animals/Tadoba/1.jpg")
find_subject_center("images/animals/pench_leopard.jpg")
find_subject_center("images/posts/vm_wild_expeditions/Carousels/DdNtnOUj7gU/instabulkdownloader.com_DdNtnOUj7gU_02.jpg")
find_subject_center("images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg")
find_subject_center("images/jayavignesh.jpg")
