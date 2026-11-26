from PIL import Image

cards_imgs = {
    'Tadoba': ('images/tours/Animals/Tadoba/1.jpg', 'Tiger Maya on right side'),
    'Pench': ('images/animals/pench_leopard.jpg', 'Leopard on top of rock ledge'),
    'Jawai': ('images/posts/vm_wild_expeditions/Carousels/DdNtnOUj7gU/instabulkdownloader.com_DdNtnOUj7gU_02.jpg', 'Leopard on rocks'),
    'Kanha': ('images/animals/kanha_barasingha.jpg', 'Barasingha stag'),
    'Dudhwa': ('images/animals/dudhwa_elephant.jpg', 'Tusker elephant in grass'),
    'Ranthambore': ('images/animals/ranthambore_sloth_bear.jpg', 'Sloth bear in Ranthambore'),
    'Panna': ('images/animals/panna_gharial.jpg', 'Gharial on rocks'),
    'Kaziranga': ('images/animals/kaziranga_rhino.jpg', 'One-horned rhino in grass'),
    'Amboli': ('images/posts/vm_wild_expeditions/Carousels/DcTbhk3jy0t/instabulkdownloader.com_DcTbhk3jy0t_04.jpg', 'Pit viper on black background'),
    'Anamalai': ('images/animals/tamilnadu_elephant.jpg', 'Tusker elephant in sunbeams'),
}

for name, (path, note) in cards_imgs.items():
    im = Image.open(path)
    print(f"{name:15s} | {im.size} | {note}")
