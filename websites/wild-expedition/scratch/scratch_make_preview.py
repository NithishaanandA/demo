html_test = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { background: #070a08; color: #fff; font-family: sans-serif; padding: 40px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 1400px; margin: 0 auto; }
  
  /* Approach A: Side by side with wide photo column and object-position/fit */
  .card-a {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    background: #111712;
    border: 1px solid rgba(197, 166, 106, 0.3);
    border-radius: 16px;
    overflow: hidden;
  }
  .card-a .img-box {
    position: relative;
    background: #0a0e0b;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-a img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  /* Approach B: Full-width untrimmed photo with natural 3:4 aspect ratio */
  .card-b {
    background: #111712;
    border: 1px solid rgba(197, 166, 106, 0.3);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .card-b .img-box {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: #080d09;
    position: relative;
    overflow: hidden;
  }
  .card-b img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
</head>
<body>
  <h2>Approach A: Side-by-side with object-fit: contain</h2>
  <div class="grid">
    <div class="card-a">
      <div class="img-box">
        <img src="images/posts/vm_wild_expeditions/Carousels/DcbIzGQj2Ew/instabulkdownloader.com_DcbIzGQj2Ew_07.jpg">
      </div>
      <div style="padding: 24px;"><h3>Vijay Mathiew</h3></div>
    </div>
    <div class="card-a">
      <div class="img-box">
        <img src="images/jayavignesh.jpg">
      </div>
      <div style="padding: 24px;"><h3>Jayavignesh Hariharan</h3></div>
    </div>
  </div>
</body>
</html>
"""

with open('scratch_preview_mentors.html', 'w', encoding='utf-8') as f:
    f.write(html_test)
print("Created preview HTML.")
