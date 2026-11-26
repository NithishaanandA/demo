from PIL import Image

def test_crop_view(name, path, target_w=460, target_h=560, pos_y=0.25):
    im = Image.open(path)
    w, h = im.size
    target_ratio = target_w / target_h
    current_ratio = w / h
    
    if current_ratio < target_ratio:
        # Image is taller than target: crop height
        new_w = w
        new_h = int(w / target_ratio)
        max_y = h - new_h
        start_y = int(max_y * pos_y)
        crop_box = (0, start_y, w, start_y + new_h)
    else:
        # Image is wider than target: crop width
        new_h = h
        new_w = int(h * target_ratio)
        max_x = w - new_w
        start_x = int(max_x * 0.5)
        crop_box = (start_x, 0, start_x + new_w, h)
        
    cropped = im.crop(crop_box)
    cropped.thumbnail((460, 560))
    cropped.save(f"scratch/preview_card_{name}.jpg")
    print(f"Saved scratch/preview_card_{name}.jpg (orig: {w}x{h}, box: {crop_box})")

test_crop_view("vijay_mathiew", "images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg", 460, 560, 0.25)
test_crop_view("jayavignesh", "images/jayavignesh.jpg", 460, 560, 0.25)
